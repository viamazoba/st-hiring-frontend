import { Formik, Form, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';
import {
    Button, Box, Grid, TextField, Switch, FormControlLabel,
    RadioGroup, Radio, FormLabel, CircularProgress, Select, MenuItem, InputLabel, FormControl,
    Typography
} from '@mui/material';
import { IDeliveryMethod, ISettings } from '../../features/settings/settingsSlice';
import SettingsAccordion from './SettingsAccordion';

interface SettingsFormProps {
    initialSettings: ISettings;
    onSubmit: (values: ISettings) => void;
    onCancel: () => void;
}


const validationSchema = Yup.object().shape({
    deliveryMethods: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
        })
    ),
    printer: Yup.object().shape({
        id: Yup.string()
            .nullable()
            .notRequired()
    }),
});


const SettingsForm = ({ initialSettings, onSubmit, onCancel }: SettingsFormProps) => {
    return (
        <Formik
            initialValues={initialSettings}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values);
                setSubmitting(false);
            }}
            enableReinitialize
        >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleReset }) => (
                <Form>
                    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', p: 1 }}>

                        <SettingsAccordion title="Delivery Methods">
                            <FieldArray name="deliveryMethods">
                                {() => (
                                    <Grid container spacing={4}>
                                        {values.deliveryMethods.map((method, index) => (
                                            <Grid item xs={12} md={6} key={index}>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}
                                                    gutterBottom
                                                >
                                                    Order Number: {method.order}

                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    label="Name"
                                                    name={`deliveryMethods[${index}].name`}
                                                    value={method.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={
                                                        touched.deliveryMethods?.[index]?.name &&
                                                        Boolean(
                                                            (errors.deliveryMethods as FormikErrors<IDeliveryMethod>[] | undefined)?.[index]?.name
                                                        )
                                                    }
                                                    helperText={
                                                        touched.deliveryMethods?.[index]?.name &&
                                                        (errors.deliveryMethods as FormikErrors<IDeliveryMethod>[] | undefined)?.[index]?.name
                                                    }
                                                    sx={{ mb: 2 }}
                                                />
                                                <FormControl fullWidth sx={{ mb: 2 }}>
                                                    <InputLabel>Select Print Type</InputLabel>
                                                    <Select
                                                        label="Select Print Type"
                                                        name={`deliveryMethods[${index}].enum`}
                                                        value={method.enum}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="PRINT_NOW">Print Now</MenuItem>
                                                        <MenuItem value="PRINT_AT_HOME">Print@Home</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <Box>
                                                    <FormControlLabel control={<Switch name={`deliveryMethods[${index}].isDefault`} checked={method.isDefault} onChange={handleChange} />} label="Default" />
                                                    <FormControlLabel control={<Switch name={`deliveryMethods[${index}].selected`} checked={method.selected} onChange={handleChange} />} label="Selected" />
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </FieldArray>
                        </SettingsAccordion>

                        <SettingsAccordion title="Fulfillment Format">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <FormControlLabel control={<Switch name="fulfillmentFormat.rfid" checked={values.fulfillmentFormat.rfid} onChange={handleChange} />} label="Rfid" />
                                    <FormControlLabel control={<Switch name="fulfillmentFormat.print" checked={values.fulfillmentFormat.print} onChange={handleChange} />} label="Print" />
                                </Grid>
                            </Grid>
                        </SettingsAccordion>

                        <SettingsAccordion title="Printer and Scanning">
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Printer Id"
                                        name="printer.id"
                                        value={values.printer.id || ''}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.printer?.id && Boolean(errors.printer?.id)}
                                        helperText={touched.printer?.id && errors.printer?.id}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl>
                                        <FormLabel>Printing Format</FormLabel>
                                        <RadioGroup row name="printingFormat.formatA" value={String(values.printingFormat.formatA)} onChange={(e) => {
                                            const isFormatA = e.currentTarget.value === 'true';
                                            handleChange({ target: { name: 'printingFormat.formatA', value: isFormatA } });
                                            handleChange({ target: { name: 'printingFormat.formatB', value: !isFormatA } });
                                        }}>
                                            <FormControlLabel value="true" control={<Radio />} label="Format A" />
                                            <FormControlLabel value="false" control={<Radio />} label="Format B" />
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Scanning</FormLabel>
                                        <RadioGroup row name="scanning.scanManually" value={String(values.scanning.scanManually)} onChange={(e) => {
                                            const isManual = e.currentTarget.value === 'true';
                                            handleChange({ target: { name: 'scanning.scanManually', value: isManual } });
                                            handleChange({ target: { name: 'scanning.scanWhenComplete', value: !isManual } });
                                        }}>
                                            <FormControlLabel value="true" control={<Radio />} label="Scan Manually" />
                                            <FormControlLabel value="false" control={<Radio />} label="Scan When Complete" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </SettingsAccordion>

                        <SettingsAccordion title="Customer Information">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="customerInfo.active"
                                                checked={values.customerInfo.active}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Active"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="customerInfo.basicInfo"
                                                checked={values.customerInfo.basicInfo}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Basic Information"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="customerInfo.addressInfo"
                                                checked={values.customerInfo.addressInfo}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Address Information"
                                    />
                                </Grid>
                            </Grid>
                        </SettingsAccordion>

                        <SettingsAccordion title="Tickets Display">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="ticketDisplay.leftInAllotment"
                                                checked={values.ticketDisplay.leftInAllotment}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Left in Allotment"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="ticketDisplay.soldOut"
                                                checked={values.ticketDisplay.soldOut}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Sold Out"
                                    />
                                </Grid>
                            </Grid>
                        </SettingsAccordion>

                        <SettingsAccordion title="Payment Methods">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="paymentMethods.cash"
                                                checked={values.paymentMethods.cash}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Cash"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="paymentMethods.creditCard"
                                                checked={values.paymentMethods.creditCard}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Credit Card"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="paymentMethods.comp"
                                                checked={values.paymentMethods.comp}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="Complimentary"
                                    />
                                </Grid>
                            </Grid>
                        </SettingsAccordion>

                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2, borderTop: '1px solid #ddd' }}>
                        <Button onClick={() => { handleReset(); onCancel(); }} sx={{ mr: 1 }}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                            {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SettingsForm;