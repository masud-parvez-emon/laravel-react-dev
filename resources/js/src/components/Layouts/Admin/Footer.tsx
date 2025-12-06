const Footer = () => {
    return <div className="dark:text-white-dark text-center sm:ltr:text-left sm:rtl:text-right p-6 pt-0 mt-auto">
        © {new Date().getFullYear()}.
        <span className="text-blue-600">Mostofa Trade Center.</span> All rights reserved.
    </div>;
};

export default Footer;
