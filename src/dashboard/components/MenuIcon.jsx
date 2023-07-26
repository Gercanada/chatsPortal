import { useSelector } from "react-redux";

export const MenuIcon = (val) => {
    const { isLightTheme } = useSelector((state) => state.ui);
    return (
        <i className={`bx ${val?.context}`} style={{ color: isLightTheme ? 'black' : 'white' }} />
    )
};
