
import React from 'react';
import "./search.filter.scss";
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import PropTypes from 'prop-types';


interface SearchFilterProps {
    placeholder?: string;
    inputClass?: string;
    label?: string;
    onChangeHandler: (value: string, event?: React.SyntheticEvent) => void;
  }
  
  const SearchFilter: React.FC<SearchFilterProps> = ({ placeholder, inputClass, onChangeHandler, label, ...props }) => {
    return (
        <>
            <div className="search-container">
                <div className="flex-col">
                    <div className='search-label'><span>{label}</span></div>
                    <InputGroup {...props} inside className="mb-1">
                    {label && <label>{label}</label>}
                        <input
                        className={inputClass}
                        placeholder={placeholder}
                        onChange={(e) => onChangeHandler(e.currentTarget.value, e)}
                        {...props}
                        />
                        <InputGroup.Button>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>
                </div>

            </div>
        </>

    )
}


export default SearchFilter;