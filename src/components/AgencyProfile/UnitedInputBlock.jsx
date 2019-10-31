import React from 'react';
import TextField from 'material-ui/TextField';

export default class UnitedInputBlock extends React.Component{
    render(){
        //let {divClassName,inputId} = this.props;
        let divClassName = this.props.divClassName ? this.props.divClassName : 'bottomContentNote d-flex align-items-center';
        let inputId = this.props.inputId;
        let labelClassName = this.props.labelClassName ? this.props.labelClassName : "d-md-block d-none col-2";
        let textFieldClassName = this.props.textFieldClassName ? this.props.textFieldClassName : "d-md-none d-block inputClass";
        let inputClassName = this.props.inputClassName ? this.props.inputClassName : "d-md-block d-none col-md-4 col-12 ";
        let pElementClassName = this.props.pElementClassName ? this.props.pElementClassName : " d-md-block d-none m-0 col-md-6 col-5";
        let inputValue = this.props.inputValue;
        let isTextarea = this.props.isTextarea ? this.props.isTextarea : false;
        let textareaParams = this.props.textareaParams ? this.props.textareaParams : {cols: 30, rows: 3, name: ""};
        let inputType = this.props.inputType ? this.props.inputType : 'text';
        let labelText = this.props.labelText;
        let textFieldLabelText = this.props.textFieldLabelText;
        let pElementText = this.props.pElementText ? this.props.pElementText : '';
        let onChangeFunc = this.props.onChangeFunc;//inputs only 1 param for now
        let floatingLabelFocusStyle = this.props.floatingLabelFocusStyle ? this.props.floatingLabelFocusStyle : { color: "#304269" };
        let underlineFocusStyle = this.props.underlineFocusStyle ? this.props.underlineFocusStyle : { borderColor: "#304269" };
        let fullWidth = this.props.fullWidth ? this.props.fullWidth : '100%';
        //here you can see examples of props
        //divClassName = 'bottomContentNote d-flex align-items-center';
        //inputId = 'basicInfoName

        return(
            <div className={divClassName}/*"bottomContentNote d-flex align-items-center"*/>
                <label htmlFor={inputId}/*"basicInfoName"*/ className={labelClassName}/*"d-md-block d-none col-2"*/>
                    {labelText/*textInfo.organizationData.organizationName + ":"*/}
                </label>
                <TextField
                    floatingLabelText={textFieldLabelText/*textInfo.organizationData.organizationName*/}
                    className={textFieldClassName/*"d-md-none d-block inputClass"*/}
                    fullWidth={fullWidth/*"100%"*/}
                    floatingLabelFocusStyle={floatingLabelFocusStyle}
                    underlineFocusStyle={underlineFocusStyle}
                    multiLine={isTextarea}
                    initialValue={/*this.state.profileData.organizationName*/inputValue}
                    onChange={(e) => { onChangeFunc(e)/*this.agencyDataChange(e.target.value, 'organizationName');*/ }}
                    value={/*this.state.profileData.organizationName*/inputValue}
                />
                {
                    !isTextarea ? 
                    <input className={inputClassName/*"d-md-block d-none col-md-4 col-12 "*/} id={inputId}/*"basicInfoName"*/ 
                        type={inputType/*"text"*/} value={/*this.state.profileData.organizationName*/inputValue}
                        onChange={(e) => { onChangeFunc(e)/*this.agencyDataChange(e.target.value, 'organizationName');*/ }} />
                    : 
                    <textarea className={inputClassName} id={inputId} name={textareaParams.name} cols={textareaParams.cols}
                        rows={textareaParams.rows} value={inputValue} onChange={(e)=>{onChangeFunc(e)}}></textarea>
                }
                
                <p className={pElementClassName/*" d-md-block d-none m-0 col-md-6 col-5"*/}>{pElementText}</p>
            </div>
        )
    }
}