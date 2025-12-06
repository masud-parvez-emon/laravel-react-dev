import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, Button, ButtonGroup, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material';
import { Link, useParams } from 'react-router';
import { useGetContainerByIdQuery, useGetContainerCategoriesQuery } from '../../../../api/api';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';


interface Container {
  number: string|null;
  category: ContainerCategory;
  trackings: ContainerTracking[];
}

interface ContainerTracking {
  container_id: number|null;
  id: number|null;
  date: string|null;
  location: string|null;
  status: 'start' | 'checkpoint' | 'over';
  description: string|null;
}

interface ContainerCategory {
  id: number|null;
  name: string|null;
  size_in_feet: number|null;
}

type Inputs = {
  number: string|null,
  category: ContainerCategory,
  trackings: ContainerTracking[],
};

export default function Form() {

    const {id} = useParams();
    const [container, setContainer] = useState<Container>({number: null, category: {id: null, name: null, size_in_feet: null}, trackings: [{container_id: null, id: null, date: '', location: '', status: 'start', description: ''}]});
    const [containerCategories, setContainerCategories] = useState<readonly ContainerCategory[]>([]);
    const { data: containerData, isFetching: isContainerFetching} = id ? useGetContainerByIdQuery(id) : {data: container, isFetching: false};
    const { data: containerCategoriesData, isFetching: isContainerCategoriesFetching} = useGetContainerCategoriesQuery({});

    const { register, control, reset, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            number: '',
            category: { id: null, name: null, size_in_feet: null },
            trackings: [{container_id: null, id: null, date: '', location: '', status: 'start', description: ''}],
        }
    });
    const { fields, append, remove, prepend, insert, move, swap } = useFieldArray({
        control,
        name: "trackings",
    });

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    console.log(watch(["number", "category"]))



    useEffect(() => {
        if (containerData) {
            if(containerData.trackings.length == 0){
                setContainer({...containerData, trackings: [{container_id: null, id: null, date: '', location: '', status: 'start', description: ''}]});
            }else{
                setContainer(containerData);
            }
            reset({...containerData})
        }
        if (containerCategoriesData) {
            setContainerCategories(containerCategoriesData);
        }
    }, [containerData, containerCategoriesData, reset]); 

    return (
        <>
            <ul className="flex space-x-2">
                <li>
                    <Link to="/containers" className="text-primary hover:underline">
                        Containers
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>{id ? 'Edit container' : 'Add container'}</span>
                </li>
            </ul>
            <Box className='p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col items-center gap-5'>
                        <TextField slotProps={{ inputLabel: { shrink: container.number ? true : false } }} label="Container Number" placeholder='Example: MSDU7532999' sx={{ width: 300 }} size='small' {...register('number')} />
                        <Controller
                            name="category"
                            control={control}
                            render={({ field, fieldState, formState }) => (
                                <Autocomplete
                                    {...field}
                                    sx={{ width: 300 }}
                                    disablePortal
                                    options={containerCategories}
                                    getOptionLabel={(option) => option.id ? (`${option.size_in_feet+"' "+option.name}`).toUpperCase() : '' }
                                    onChange={(event, value) => field.onChange(value)}
                                    renderInput={(params) => (
                                        <TextField {...params} placeholder="Select Category" size="small" label="Container Category" />
                                    )}
                                />
                            )}
                        />
                    </div>
                    <Divider className='my-10'>Tracking</Divider>
                    <div className='space-y-5'>
                        {fields.map((field, index) => {
                            return (
                                <Stack 
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2}
                                    key={field.id}
                                    >
                                    <Grid container spacing={2} className='grow'>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }} >
                                            <FormControl fullWidth>
                                                <InputLabel size='small'>Status</InputLabel>
                                                <Controller
                                                    name={`trackings.${index}.status`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            size='small'
                                                            label="Status"
                                                            {...(index == 0 ?  { disabled: true } : {})}
                                                            >
                                                            {index === 0 && <MenuItem value={'start'}>Start</MenuItem>}
                                                            <MenuItem value={'checkpoint'}>Checkpoint</MenuItem>
                                                            <MenuItem value={'over'}>Over</MenuItem>
                                                        </Select>
                                                    )}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <TextField label="Date" placeholder='Enter Date' {...register(`trackings.${index}.date`)} fullWidth size='small'/>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <TextField label="Location" placeholder='Enter Location' {...register(`trackings.${index}.location`)} fullWidth size='small'/>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <TextField label="Description" placeholder='Enter Description' {...register(`trackings.${index}.description`)} fullWidth size='small'/>
                                        </Grid>
                                    </Grid>
                                    <ButtonGroup variant="outlined" className='self-center'>
                                        <Tooltip title="Delete" disableInteractive>
                                            <span>
                                                <Button disabled={index == 0} onClick={() => remove(index)}>
                                                    <DeleteTwoToneIcon/>
                                                </Button>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title="Add" disableInteractive>
                                            <span>
                                                <Button onClick={() => insert(index+1, {container_id: field.container_id, id: null, date: '', location: '', status: 'checkpoint', description: ''})}>
                                                    <AddCircleTwoToneIcon/>
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    </ButtonGroup>
                                </Stack>
                            );
                        })}
                    </div>
                </form>
            </Box>
        </>
    );
}