import React from 'react';
import { CheckPicker } from 'rsuite';
import "./multiSelectdropDown.scss";
import PropTypes from 'prop-types';

interface AppMultiSelectDropDownProps {
  label: string;
  onChangeHandler: (value: any, event?: React.SyntheticEvent) => void;
  data: { label: string; value: string; url?: string }[];
  placeholder?: string;
  isOpen?: boolean;
  onOpenHandler?: () => void;
  onCloseHandler?: () => void;
  onCleanHandler?: () => void;
}

const AppMultiSelectDropDown: React.FC<AppMultiSelectDropDownProps> = ({
  label,
  onChangeHandler,
  data,
  placeholder,
  isOpen,
  onOpenHandler,
  onCloseHandler,
  onCleanHandler
}) => (  <>
    <div className="multiselect-dropdown-wrapper">
      <div className='dropdown-label'><span>{label}</span></div>
      <div className={`${isOpen ? "is-dropdown-open" : ""} check-picker-wrap`}>
  <CheckPicker
    block
    placeholder={placeholder}
    onChange={onChangeHandler}
    size="lg"
    onOpen={onOpenHandler}
    onClose={onCloseHandler}
    onClean={onCleanHandler}
    data={data}
    searchable={false}
    style={{ width: 224 }}
  />
</div>
    </div>
  </>
);



export default AppMultiSelectDropDown;