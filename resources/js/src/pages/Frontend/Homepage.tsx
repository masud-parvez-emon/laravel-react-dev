import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
// import ReactApexChart from '../react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Dropdown from '../../components/Dropdown';
import { setPageTitle } from '../../store/themeConfigSlice';
import { FormSubmitHandler } from 'react-hook-form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Index = () => {
    // const theme = useTheme();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Homepage'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

    const formSubmit:React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log('submitted');
    }
    const handletrackingNumberChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault();
        event.target.value = event.target.value.toUpperCase()
        setHasInput(true);
        if(event.target.value){
            setHasInput(true);
        }
    }

    const handleFormResetClick:React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setHasInput(false);
        console.log('form cleared')
    }

    const [hasInput, setHasInput] = useState(false);

    return (
        <>
            <ul className="flex space-x-2 border-t py-3">
                <li>
                    <Link to="/" className="text-gray-500 hover:underline">
                        Track a shipment
                    </Link>
                </li>
            </ul>
            <div className='pb-10'>
                <h1 className="pb-4 relative text-center font-extrabold text-4xl after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:h-1.5 after:w-24 after:rounded-md after:bg-blue-600">Tracking</h1>
            </div>

            <form onSubmit={formSubmit}>
                <div className="max-w-md mb-5 m-auto">
                    <div className="flex items-center relative">
                        <button className={`absolute px-2 ${hasInput ? 'right-9' : 'hidden'}`} type="reset" onClick={handleFormResetClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button className={`absolute px-2 ${hasInput ? 'right-0 before:absolute before:bg-gray-400 before:left-0 before:w-[0.01rem] before:h-5 before:block' : 'left-0'}`} type="submit" disabled={hasInput ? false : true}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z" fill="#1C274C"/>
                            </svg>
                        </button>
                        <input id="trackingNumber" name='okok' type="text" placeholder="Enter a Container/Bill of Lading Number" className={` ${hasInput ? 'pr-12' : 'pl-9'} form-input rounded-md bg-gray-200`} onChange={handletrackingNumberChange}/>
                    </div>
                </div>
            </form>

            {/* <div className="mb-5 max-w-md m-auto">
                <div className="flex focus-within:outline-blue-600 focus-within:outline-1 focus-within:outline-solid rounded-md">
                    <div className="bg-[#eee] flex justify-center items-center rounded-l-md px-3 font-semibold border border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z" fill="#1C274C"/>
                        </svg>
                    </div>
                    <input id="trackingNumber" type="text" placeholder="Enter a Container/Bill of Lading Number" className="form-input rounded-l-none focus:border-inherit" />
                </div>
            </div> */}

            <div className="pt-5">
                <div className='pb-6 border-b-2'>
                    <span className='text-3xl font-extrabold'>
                        Container Number: XXXXXXXXXXXX
                    </span>
                </div>
                <div className='pt-6'>
                    <ul className='flex gap-10 flex-wrap'>
                        <li>
                            <div>
                                <span className='block text-[1rem]'>Container Number</span>
                                <span className='block text-[1.1rem] font-extrabold'>XXXXXXXXXXXX</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span className='block text-[1rem]'>Shipped From</span>
                                <span className='block text-[1.1rem] font-extrabold'>XXXXXXXXXXXX</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span className='block text-[1rem]'>Port of Load</span>
                                <span className='block text-[1.1rem] font-extrabold'>XXXXXXXXXXXX</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span className='block text-[1rem]'>Port of Discharge</span>
                                <span className='block text-[1.1rem] font-extrabold'>XXXXXXXXXXXX</span>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span className='block text-[1rem]'>Shipped To</span>
                                <span className='block text-[1.1rem] font-extrabold'>XXXXXXXXXXXX</span>
                            </div>
                        </li>   
                    </ul>
                </div>
                <div className='mt-16'>
                    <span className='text-[22px] font-extrabold mb-9 block'>
                        CONTAINERS
                    </span>
                    <Accordion
                        elevation={0}
                        sx={{ 
                            backgroundColor: 'transparent',
                        }}
                    >
                        <AccordionSummary
                            // expandIcon={
                            //     <div className="icon-wrapper">
                            //         <AddIcon className="plus" />
                            //         <RemoveIcon className="minus" />
                            //     </div>
                            // }
                            sx={{
                                borderRadius: '8px',
                                padding: 0,
                                boxShadow: '0 3px 66px -10px rgba(34,34,33,.5)',
                                '& .MuiAccordionSummary-content': {
                                    margin: 0,
                                    flexWrap: 'wrap',
                                    padding: '17px 20px 17px 30px',
                                },
                                minHeight: '7.5rem',
                                '&.Mui-expanded': {
                                    minHeight: '7.5rem',
                                },
                                '& .MuiAccordionSummary-content.Mui-expanded': {
                                    margin: 0,
                                },
                                // flexDirection: 'row',
                                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                    transform: 'none', // Disable the default rotation
                                },
                                '& .minus': { display: 'none' },
                                '& .Mui-expanded .minus': { display: 'block' },
                                '& .Mui-expanded .plus': { display: 'none' },
                                '&:before':{
                                    content: "''",
                                    position: 'absolute',
                                    display: 'block',
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    height: '78px',
                                    backgroundColor: '#f2f2f2',
                                    zIndex: '-1',
                                },
                                '@media (min-width: 800px)': {
                                    '& .MuiAccordionSummary-content': {
                                        padding: '0',
                                    },
                                    '&:before':{
                                        top: '0',
                                        left: 'auto',
                                        width: '40%',
                                        height: 'auto',
                                    },
                                },
                            }}
                        >
                            <div className='w-full min-[800px]:w-[30%]'>
                                <div className='flex flex-wrap justify-start min-[800px]:justify-center items-center min-[800px]:min-h-[120px]'>
                                    <div className="flex flex-wrap items-end">
                                        <span className="mtc-icon-container-empty text-[16px] font-extrabold! mr-2.5 mb-1"></span>
                                        <div>
                                            <span className='block'>Container</span>
                                            <span className='block text-[16px]'>MSDU7532999</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full min-[800px]:w-[30%]'>
                                <div className='flex flex-wrap justify-start min-[800px]:justify-center items-center min-[800px]:min-h-[120px] mb-9 min-[800px]:mb-0'>
                                    <div className="flex flex-wrap items-end">
                                        <span className="mtc-icon-type text-[25px] mr-2.5 mb-1"></span>
                                        <div>
                                            <span className='block'>Type</span>
                                            <span className='block text-[16px]'>40' HIGH CUBE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[75%] min-[800px]:w-[30%]'>
                                <div className='flex flex-wrap justify-start min-[800px]:justify-center items-center min-[800px]:min-h-[120px]'>
                                    <div className="flex flex-wrap items-end">
                                        <span className="mtc-icon-marker text-[30px] mr-2.5 mb-1"></span>
                                        <div>
                                            <span className='block'>Latest move</span>
                                            <span className='block text-[16px]'>YANTIAN, CN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[25%] min-[800px]:w-[10%]'>
                                <div className='flex flex-wrap justify-end min-[800px]:justify-center items-center min-h-12 min-[800px]:min-h-[120px]'>
                                    <div className="icon-wrapper bg-[#eed484] p-1 rounded-full">
                                        <AddIcon className="plus" />
                                        <RemoveIcon className="minus" />
                                    </div>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails
                        sx={{
                            'marginTop': '25px',
                            'padding': 0,
                        }}
                        >
                            <div className="max-[800px]:hidden flex items-center bg-[#f2f2f2] rounded-xl py-[12px]">
                                <div className="w-[10%]">
                                </div>
                                <div className="w-[20%] px-[5px]">
                                    <span className="text-[13px] font-bold block">Date</span>
                                </div>
                                <div className="w-[35%] px-[5px]">
                                    <span className="text-[13px] font-bold block">Location</span>
                                </div>
                                <div className="w-[35%] px-[5px]">
                                    <span className="text-[13px] font-bold block">Description</span>
                                </div>
                            </div>
                            <div>

                                {/* latest */}
                                <div>
                                    <div className='py-[42px] relative border-b border-[#eee]

                                        before:bg-[#eed484]
                                        before:bottom-0
                                        before:block
                                        before:left-[8%]
                                        before:absolute
                                        before:translate-x-[-50%]
                                        before:w-[3px]
                                        before:top-[24px]

                                        min-[800px]:flex
                                        min-[800px]:items-center
                                        min-[800px]:py-[20px]
                                        min-[800px]:px-0
                                        min-[800px]:before:left-[5%]
                                        min-[800px]:before:top-[50%]'>

                                        <div className='min-[800px]:block w-[10%] hidden'>
                                            <div className='p-[5px] flex justify-center items-center'>
                                                <div className='flex flex-wrap items-center mx-auto my-0 relative'>
                                                    <span className='bg-[#fff] border-5 border-[#eed484] h-[16px] w-[16px] rounded-full'></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* to do from here */}
                                        <div className='min-[800px]:w-[20%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span className='bg-[#fff] border-5 border-[#eed484] rounded-full h-[16px] w-[16px] absolute left-[8.2%] translate-x-[-50%] top-[42px] min-[800px]:hidden'></span>
                                                    <span>
                                                        12/12/2025
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Yantian,  CN
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Empty to Shipper
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* checkpoint [needs to be update in 2 place]*/}
                                <div>
                                    <div className='py-[42px] relative border-b border-[#eee]

                                        before:bg-[#eed484]
                                        before:bottom-0
                                        before:block
                                        before:left-[8%]
                                        before:absolute
                                        before:translate-x-[-50%]
                                        before:w-[3px]
                                        before:top-0 /* to be 0 */

                                        min-[800px]:flex
                                        min-[800px]:items-center
                                        min-[800px]:py-[20px]
                                        min-[800px]:px-0
                                        min-[800px]:before:left-[5%]
                                        min-[800px]:before:top-0' /* to be 0 */>

                                        <div className='min-[800px]:block w-[10%] hidden'>
                                            <div className='p-[5px] flex justify-center items-center'>
                                                <div className='flex flex-wrap items-center mx-auto my-0 relative'>
                                                    <span className='bg-[#fff] border-5 border-[#eed484] h-[16px] w-[16px] rounded-full'></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* to do from here */}
                                        <div className='min-[800px]:w-[20%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span className='bg-[#fff] border-5 border-[#eed484] rounded-full h-[16px] w-[16px] absolute left-[8.2%] translate-x-[-50%] top-[42px] min-[800px]:hidden'></span>
                                                    <span>
                                                        12/12/2025
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Yantian,  CN
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Empty to Shipper
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* start [needs to be update in 3]*/}
                                <div>
                                    <div className='py-[42px] relative /* noBorderBotton */

                                        before:bg-[#eed484]
                                        before:bottom-[42px] /* 42pxInsteadof0 */
                                        before:block
                                        before:left-[8%]
                                        before:absolute
                                        before:translate-x-[-50%]
                                        before:w-[3px]
                                        before:top-0 /* to be 0 */

                                        min-[800px]:flex
                                        min-[800px]:items-center
                                        min-[800px]:py-[20px]
                                        min-[800px]:px-0
                                        min-[800px]:before:left-[5%]
                                        min-[800px]:before:bottom-[50%] /* toBeAdded */
                                        min-[800px]:before:top-0' /* to be 0 */>

                                        <div className='min-[800px]:block w-[10%] hidden'>
                                            <div className='p-[5px] flex justify-center items-center'>
                                                <div className='flex flex-wrap items-center mx-auto my-0 relative'>
                                                    {/* replace bg-[#eed484], height 38px, width 38px */}
                                                    {/* add before sudo element */}
                                                    <span className='bg-[#eed484] border-[2px] border-[#eed484] h-[38px] w-[38px] rounded-full before:content-[""] before:font-[icomoon] before:text-[#fff] before:text-[22px] before:left-[50%] before:absolute before:top-[50%] before:translate-[-50%]'></span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* to do from here */}
                                        <div className='min-[800px]:w-[20%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    {/* replace bg-[#eed484], height 38px, width 38px, top-auto */}
                                                    {/* add before sudo element, bottom 35px,  */}
                                                    <span className='bg-[#eed484] border-[2px] border-[#eed484] rounded-full h-[38px] w-[38px] absolute left-[8.2%] translate-x-[-50%] top-auto bottom-[35px] /* topAuto */ min-[800px]:hidden before:content-[""] before:font-[icomoon] before:text-[#fff] before:text-[22px] before:left-[50%] before:absolute before:top-[50%] before:translate-[-50%]'></span>
                                                    <span>
                                                        12/12/2025
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center mb-[25px]'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Yantian,  CN
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='min-[800px]:w-[35%]'>
                                            <div className='pr-[10px] pl-[70px] min-[800px]:p-[5px] min-[800px]:m-0 flex justify-start items-center'>
                                                <div className='flex flex-wrap items-center'>
                                                    <span>
                                                        Empty to Shipper
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </>
    );
};

export default Index;
