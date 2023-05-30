
export default function useHandleCountryInput(setData){
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'iso' && value.length > 2) {
            return;
        }
        if (name === 'iso'){
            setData((prevData) => ({
                ...prevData,
                [name]: value.toUpperCase(),
            }));
            return;
        }
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        setData((prevData) => ({
            ...prevData,
            [name]: capitalizedValue,
        }));
    }
    return {onHandleChange};
}
