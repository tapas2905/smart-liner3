import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import alert from '../../services/alert';

// Define the shape of a single item in a purchase order
interface Item {
  itemCode: string;
  quantity: number;
}

// Define the shape of a single purchase order
interface PurchaseOrder {
  purchaseOrder: string;
  purchaseDate?: string; // Optional
  recipientFirstName: string;
  recipientLastName: string;
  recipientAddress1: string;
  recipientAddress2?: string; // Optional
  recipientCountryCode: string;
  recipientState: string;
  recipientZip: string;
  recipientPhoneNumber?: string; // Optional
  items: Item[];
}

// Define the shape of the entire form data, which is an array of PurchaseOrders
interface FormData {
  purchaseOrders: PurchaseOrder[];
}

const App: React.FC = () => {
  // Yup validation schema for a single item
  const itemSchema = Yup.object().shape({
    itemCode: Yup.string().required('Item is required'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be at least 1')
      .integer('Quantity must be an integer'),
  });

  // Yup validation schema for a single purchase order
  const purchaseOrderSchema = Yup.object().shape({
    purchaseOrder: Yup.string().required('Purchase Order is required'),
    purchaseDate: Yup.string().optional(),
    recipientFirstName: Yup.string().required('Recipient First Name is required'),
    recipientLastName: Yup.string().required('Recipient Last Name is required'),
    recipientAddress1: Yup.string().required('Recipient Address 1 is required'),
    recipientAddress2: Yup.string().optional(),
    recipientCountryCode: Yup.string().required('Recipient Country Code is required'),
    recipientState: Yup.string().required('Recipient State is required'),
    recipientZip: Yup.string().required('Recipient Zip is required').matches(/^\d{5}(-\d{4})?$/, 'Invalid Zip Code'),
    recipientPhoneNumber: Yup.string().optional().matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    items: Yup.array().of(itemSchema).min(1, 'At least one item is required'),
  });

  // Yup validation schema for the entire form (an array of purchase orders)
  const validationSchema = Yup.object().shape({
    purchaseOrders: Yup.array().of(purchaseOrderSchema).min(1, 'At least one Purchase Order is required'),
  });

  // Initial values for a new, empty purchase order
  const initialNewPurchaseOrder: PurchaseOrder = {
    purchaseOrder: '',
    purchaseDate: '',
    recipientFirstName: '',
    recipientLastName: '',
    recipientAddress1: '',
    recipientAddress2: '',
    recipientCountryCode: '',
    recipientState: '',
    recipientZip: '',
    recipientPhoneNumber: '',
    items: [{ itemCode: '', quantity: 1 }],
  };

  const initialFormValues: FormData = {
    purchaseOrders: [initialNewPurchaseOrder], // Start with one empty purchase order
  };

  const handleSubmit = (values: FormData) => {
    console.log('Form Submitted:', values);
   alert("Form submitted successfully", "success");
  };

  return (
    <>
     
      <div className="app-container">
        <div className="form-wrapper">
          <div className="header-section">
            <h1 className="main-title">Please Enter Your Order For Submission</h1>
          </div>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="main-form">
                <FieldArray name="purchaseOrders">
                  {({ push, remove }) => (
                    <>
                      {values.purchaseOrders.map((po, poIndex) => (
                        <div key={poIndex} className="purchase-order-block">
                          <div className="po-header">
                            <h2 className="po-title">Purchase Order #{poIndex + 1}</h2>
                            {values.purchaseOrders.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(poIndex)}
                                className="remove-po-button"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>

                          {/* Purchase Order Details */}
                          <div className="grid-container">
                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.purchaseOrder`} className="label">
                                Purchase Order
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.purchaseOrder`}
                                name={`purchaseOrders.${poIndex}.purchaseOrder`}
                                type="text"
                                placeholder="Enter Your ID"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.purchaseOrder`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.purchaseDate`} className="label">
                                Purchase Date (Optional)
                              </label>
                              <div className="input-with-icon">
                                <Field
                                  id={`purchaseOrders.${poIndex}.purchaseDate`}
                                  name={`purchaseOrders.${poIndex}.purchaseDate`}
                                  type="date"
                                  className="input-field"
                                />
                                <div className="icon-wrapper">
                                  <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <ErrorMessage name={`purchaseOrders.${poIndex}.purchaseDate`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientFirstName`} className="label">
                                Recipient First Name
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientFirstName`}
                                name={`purchaseOrders.${poIndex}.recipientFirstName`}
                                type="text"
                                placeholder="Enter First Name"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientFirstName`} component="div" className="error-message" />
                            </div>
                          </div>

                          {/* Recipient Address Details */}
                          <div className="grid-container">
                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientLastName`} className="label">
                                Recipient Last Name
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientLastName`}
                                name={`purchaseOrders.${poIndex}.recipientLastName`}
                                type="text"
                                placeholder="Enter Last Name"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientLastName`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientAddress1`} className="label">
                                Recipient Address 1
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientAddress1`}
                                name={`purchaseOrders.${poIndex}.recipientAddress1`}
                                type="text"
                                placeholder="Enter Address 1"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientAddress1`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientAddress2`} className="label">
                                Recipient Address 2 (Optional)
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientAddress2`}
                                name={`purchaseOrders.${poIndex}.recipientAddress2`}
                                type="text"
                                placeholder="Enter Address 2"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientAddress2`} component="div" className="error-message" />
                            </div>
                          </div>

                          <div className="grid-container four-cols">
                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientCountryCode`} className="label">
                                Recipient Country Code
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientCountryCode`}
                                name={`purchaseOrders.${poIndex}.recipientCountryCode`}
                                type="text"
                                placeholder="Enter Country Code"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientCountryCode`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientState`} className="label">
                                Recipient State
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientState`}
                                name={`purchaseOrders.${poIndex}.recipientState`}
                                type="text"
                                placeholder="Enter State"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientState`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientZip`} className="label">
                                Recipient Zip
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientZip`}
                                name={`purchaseOrders.${poIndex}.recipientZip`}
                                type="text"
                                placeholder="Enter Zip Code"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientZip`} component="div" className="error-message" />
                            </div>

                            <div className="form-field">
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientPhoneNumber`} className="label">
                                Recipient Phone Number (Optional)
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientPhoneNumber`}
                                name={`purchaseOrders.${poIndex}.recipientPhoneNumber`}
                                type="text"
                                placeholder="Enter Phone Number"
                                className="input-field"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientPhoneNumber`} component="div" className="error-message" />
                            </div>
                          </div>

                          {/* Items Section for this Purchase Order */}
                          <h3 className="section-title">Items for PO #{poIndex + 1}</h3>
                          <div className="table-container">
                            <table className="items-table">
                              <thead>
                                <tr>
                                  <th scope="col" className="table-header">
                                    Item
                                  </th>
                                  <th scope="col" className="table-header">
                                    Quantity
                                  </th>
                                  <th scope="col" className="table-header">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <FieldArray name={`purchaseOrders.${poIndex}.items`}>
                                {({ push: pushItem, remove: removeItem }) => (
                                  <tbody>
                                    {values.purchaseOrders[poIndex].items.map((item, itemIndex) => (
                                      <tr key={itemIndex}>
                                        <td className="table-data">
                                          <Field
                                            name={`purchaseOrders.${poIndex}.items.${itemIndex}.itemCode`}
                                            type="text"
                                            placeholder="Enter Item Code"
                                            className="input-field"
                                          />
                                          <ErrorMessage name={`purchaseOrders.${poIndex}.items.${itemIndex}.itemCode`} component="div" className="error-message" />
                                        </td>
                                        <td className="table-data quantity-controls">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setFieldValue(
                                                `purchaseOrders.${poIndex}.items.${itemIndex}.quantity`,
                                                Math.max(1, item.quantity - 1)
                                              )
                                            }
                                            className="quantity-button"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                            </svg>
                                          </button>
                                          <Field
                                            name={`purchaseOrders.${poIndex}.items.${itemIndex}.quantity`}
                                            type="number"
                                            min="1"
                                            className="quantity-input"
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setFieldValue(
                                                `purchaseOrders.${poIndex}.items.${itemIndex}.quantity`,
                                                item.quantity + 1
                                              )
                                            }
                                            className="quantity-button"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                          </button>
                                          <ErrorMessage name={`purchaseOrders.${poIndex}.items.${itemIndex}.quantity`} component="div" className="error-message" />
                                        </td>
                                        <td className="table-data">
                                          <button
                                            type="button"
                                            onClick={() => removeItem(itemIndex)}
                                            className="remove-item-button"
                                            disabled={values.purchaseOrders[poIndex].items.length === 1} // Disable remove if only one item
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </FieldArray>
                            </table>
                          </div>
                          <div className="add-item-container">
                            <button
                              type="button"
                              onClick={() => setFieldValue(`purchaseOrders.${poIndex}.items`, [...values.purchaseOrders[poIndex].items, { itemCode: '', quantity: 1 }])}
                              className="add-item-button"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                              <span>Add Additional Item</span>
                            </button>
                          </div>
                          {/* Ensure errors.purchaseOrders[poIndex].items is a string before rendering */}
                          {/* {touched.purchaseOrders?.[poIndex]?.items && typeof errors.purchaseOrders?.[poIndex]?.items === 'string' && (
                            <div className="error-message">{(errors.purchaseOrders[poIndex]?.items as string)}</div>
                          )} */}
                        </div>
                      ))}

                      {/* Add additional PO button */}
                      <div className="add-po-container">
                        <button
                          type="button"
                          onClick={() => push(initialNewPurchaseOrder)}
                          className="add-po-button"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Add additional PO</span>
                        </button>
                      </div>
                      {/* Ensure errors.purchaseOrders is a string before rendering */}
                      {touched.purchaseOrders && typeof errors.purchaseOrders === 'string' && (
                        <div className="error-message">{errors.purchaseOrders}</div>
                      )}
                    </>
                  )}
                </FieldArray>

                {/* Submit Button */}
                <div className="submit-container">
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Submit Purchase Items
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default App;
