import { useRef } from "react";
import { InputLabel, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useStyles from "./useStyles";
import useHelperTextStyles from "./useHelperTextStyles";
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

/**
 * @description Custom material ui input.
 * @param {any} props Component props.
 * @returns {JSX}
 */
function InputField({
  label,
  placeholder,
  value,
  name,
  error,
  inputProps,
  disabled,
  handleChange,
  onFocus,
  onBlur,
  max,
  sx,
  inputStyleProps,
  multiline,
  minRows,
  labelSx,
  ...restProps
}) {
  const classes = useStyles();
  const helperTextStyles = useHelperTextStyles();
  const ref = useRef(null);
  const handleRefChange = (event) => {
    ref.current.focus();
    handleChange(event);
  };
  return (
    <div {...restProps}>
      {label ? (
        <InputLabel className={classes.label} shrink sx={labelSx}>
          {label}
        </InputLabel>
      ) : null}
      <TextField
        disabled={disabled}
        variant="standard"
        inputRef={ref}
        sx={sx}
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={handleRefChange}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        multiline={multiline}
        minRows={minRows}
        inputProps={{
          maxLength: max,
          style: { fontSize: fontSize["14px"], paddingLeft: "10px", ...inputStyleProps },
        }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{ ...inputProps, disableUnderline: true }}
        FormHelperTextProps={{
          classes: {
            root: helperTextStyles.root,
          },
        }}
      />
      {error && (
        <Typography color={colors.red} fontSize={fontSize["14px"]}>
          {error}
        </Typography>
      )}
    </div>
  );
}

InputField.defaultProps = {
  label: "",
  labelSx: {},
  placeholder: "",
  value: "",
  name: "",
  inputProps: {},
  error: null,
  disabled: false,
  onFocus: null,
  onBlur: null,
  max: null,
  sx: {},
  inputStyleProps: {},
  multiline: false,
  minRows: 1,
  handleChange: null,
};

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  inputProps: PropTypes.checkPropTypes(),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  max: PropTypes.number,
  handleChange: PropTypes.func,
  sx: PropTypes.checkPropTypes(),
  inputStyleProps: PropTypes.checkPropTypes(),
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  labelSx: PropTypes.checkPropTypes(),
};

export default InputField;
