import React from "react";

const Checkbox = (props) => {
    const { onChange, checked, className, onClick, id} = props;

    return <input type="checkbox" id={id} checked={checked} onChange={onChange} className={className} onClick={onClick}/>;
};

export default Checkbox;