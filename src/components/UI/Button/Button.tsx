import { FC, PropsWithChildren } from "react";
import cl from './Button.module.css'
import { IButtonProps } from "./types";

const Button: FC<PropsWithChildren<IButtonProps>> = ({children, ...props}) => {
    return (
        <button  {...props} className={cl.btn}>
            {children}
        </button>
    )
}

export default Button