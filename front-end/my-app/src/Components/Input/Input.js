import React from 'react'
 function Input({handleChange,clicked}) {
    return (
        <div>
               <form>
                <label>
                    Name:
                    <input type="text"  onChange={ handleChange} />
                </label>
                <input type="button" onClick =  { () => clicked()} />
                </form>
        </div>
    )
}

export default Input