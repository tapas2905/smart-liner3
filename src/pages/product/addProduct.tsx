import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import alert from '../../services/alert';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './addProduct.module.scss';

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

    <Header/>

    <div className={styles.addProductBdyPrt}>
      <div className={styles.container}>
        <div className={styles.pageTitle}>
          <h1>Please Enter Your Order For Submission</h1>
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
                    <div className={styles.addProductFormBox}>
                      <div key={poIndex} className="purchase-order-block">
                        <div className="po-header">
                          {/* <h2 className="po-title">Purchase Order #{poIndex + 1}</h2> */}
                          {values.purchaseOrders.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(poIndex)}
                              className={styles.removePoButton}
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          )}
                        </div>

                        {/* Purchase Order Details */}
                        <div className={styles.smartLinerFormClmThree}>
                          <ul>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.purchaseOrder`}>
                                Purchase Order
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.purchaseOrder`}
                                name={`purchaseOrders.${poIndex}.purchaseOrder`}
                                type="text"
                                placeholder="Enter Your ID"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.purchaseOrder`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.purchaseDate`}>
                                Purchase Date (Optional)
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.purchaseDate`}
                                name={`purchaseOrders.${poIndex}.purchaseDate`}
                                type="date"
                                className={styles.noCalenderIcon}
                              />
                              {/* <div className={styles.calenderIcon}>
                                <img src='images/calender-icon.svg' alt='calender icon' />
                              </div> */}
                              <ErrorMessage name={`purchaseOrders.${poIndex}.purchaseDate`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientFirstName`}>
                                Recipient First Name
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientFirstName`}
                                name={`purchaseOrders.${poIndex}.recipientFirstName`}
                                type="text"
                                placeholder="Enter First Name"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientFirstName`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientLastName`}>
                                Recipient Last Name
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientLastName`}
                                name={`purchaseOrders.${poIndex}.recipientLastName`}
                                type="text"
                                placeholder="Enter Last Name"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientLastName`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientAddress1`}>
                                Recipient Address 1
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientAddress1`}
                                name={`purchaseOrders.${poIndex}.recipientAddress1`}
                                type="text"
                                placeholder="Enter Address 1"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientAddress1`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientAddress2`}>
                                Recipient Address 2 (Optional)
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientAddress2`}
                                name={`purchaseOrders.${poIndex}.recipientAddress2`}
                                type="text"
                                placeholder="Enter Address 2"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientAddress2`} component="p" className={styles.errorMessage} />
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientCountryCode`}>
                                Recipient Country Code
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientCountryCode`}
                                name={`purchaseOrders.${poIndex}.recipientCountryCode`}
                                type="text"
                                placeholder="Enter Country Code"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientCountryCode`} component="p" className={styles.errorMessage} />
                            </li>
                            <li className={styles.stateZipRow}>
                              <div className={styles.stateField}>
                                <label htmlFor={`purchaseOrders.${poIndex}.recipientState`}>
                                  Recipient State
                                </label>
                                <Field
                                  id={`purchaseOrders.${poIndex}.recipientState`}
                                  name={`purchaseOrders.${poIndex}.recipientState`}
                                  type="text"
                                  placeholder="Enter State"
                                />
                                <ErrorMessage name={`purchaseOrders.${poIndex}.recipientState`} component="p" className={styles.errorMessage} />
                              </div>
                              <div className={styles.zipField}>
                                <label htmlFor={`purchaseOrders.${poIndex}.recipientZip`}>
                                  Recipient Zip
                                </label>
                                <Field
                                  id={`purchaseOrders.${poIndex}.recipientZip`}
                                  name={`purchaseOrders.${poIndex}.recipientZip`}
                                  type="text"
                                  placeholder="Enter Zip Code"
                                />
                                <ErrorMessage name={`purchaseOrders.${poIndex}.recipientZip`} component="p" className={styles.errorMessage} />
                              </div>
                            </li>
                            <li>
                              <label htmlFor={`purchaseOrders.${poIndex}.recipientPhoneNumber`}>
                                Recipient Phone Number (Optional)
                              </label>
                              <Field
                                id={`purchaseOrders.${poIndex}.recipientPhoneNumber`}
                                name={`purchaseOrders.${poIndex}.recipientPhoneNumber`}
                                type="text"
                                placeholder="Enter Phone Number"
                              />
                              <ErrorMessage name={`purchaseOrders.${poIndex}.recipientPhoneNumber`} component="p" className={styles.errorMessage} />
                            </li>
                          </ul>
                        </div>

                        {/* Items Section for this Purchase Order */}
                        <div className={styles.productItmPrt}>
                          {/* <h3 className="section-title">Items for PO #{poIndex + 1}</h3> */}
                          <div className={styles.productItmTable}>
                            <div className={styles.proTableHead}>
                              <ul>
                                <li>Item</li>
                                <li>Quantity</li>
                                <li>Action</li>
                              </ul>
                            </div>
                            <FieldArray name={`purchaseOrders.${poIndex}.items`}>
                              {({ push: pushItem, remove: removeItem }) => (
                                <div className={styles.proTableBody}>
                                  {values.purchaseOrders[poIndex].items.map((item, itemIndex) => (
                                    <ul key={itemIndex}>
                                      <li data-label="Item" className={styles.selectItemDropdown}>
                                        <select name="cars" id="cars">
                                          <option value="volvo">SA0401/SB401</option>
                                          <option value="saab">Saab</option>
                                          <option value="mercedes">Mercedes</option>
                                          <option value="audi">Audi</option>
                                        </select>
                                      </li>
                                      <li data-label="Quantity" className={styles.quantityField}>
                                        <div className={styles.quantityBtnInput}>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setFieldValue(
                                                `purchaseOrders.${poIndex}.items.${itemIndex}.quantity`,
                                                Math.max(1, item.quantity - 1)
                                              )
                                            }
                                          >
                                            <i className="fa-solid fa-minus"></i>
                                          </button>
                                          <Field
                                            name={`purchaseOrders.${poIndex}.items.${itemIndex}.quantity`}
                                            type="number"
                                            min="1"
                                          />
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setFieldValue(
                                                `purchaseOrders.${poIndex}.items.${itemIndex}.quantity`,
                                                item.quantity + 1
                                              )
                                            }
                                          >
                                            <i className="fa-solid fa-plus"></i>
                                          </button>
                                        </div>
                                        <ErrorMessage name={`purchaseOrders.${poIndex}.items.${itemIndex}.quantity`} component="p" className="error-message" />
                                      </li>
                                      <li data-label="Action" className={styles.itemDeleteBtn}>
                                        <button
                                          type="button"
                                          onClick={() => removeItem(itemIndex)}
                                          disabled={values.purchaseOrders[poIndex].items.length === 1} // Disable remove if only one item
                                        >
                                          <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                      </li>
                                    </ul>
                                  ))}
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          <div className={styles.addItem}>
                            <button
                              type="button"
                              onClick={() => setFieldValue(`purchaseOrders.${poIndex}.items`, [...values.purchaseOrders[poIndex].items, { itemCode: '', quantity: 1 }])}
                            >
                              <i className="fa-solid fa-circle-plus"></i>
                              <span>Add Additional Item</span>
                            </button>
                          </div>
                        </div>


                      </div>
                    </div>
                  ))}

                  {/* Additional Po and  Submit Item Button */}
                  <div className={styles.addSubmitBtn}>
                    <ul>
                      <li>
                        <button
                          type="button"
                          onClick={() => push(initialNewPurchaseOrder)}
                          className={styles.addPoBtn}
                        >
                          <span>Add additional PO</span>
                        </button>
                      {/* Ensure errors.purchaseOrders is a string before rendering */}
                      {touched.purchaseOrders && typeof errors.purchaseOrders === 'string' && (
                        <div className="error-message">{errors.purchaseOrders}</div>
                      )}
                      </li>
                      <li>
                        <button
                          type="submit"
                          className={styles.submitBtn}
                        >
                          Submit Purchase Items
                        </button>
                      </li>
                    </ul>
                  </div>                    
                </>
              )}
            </FieldArray>
            
          </Form>
          )}
        </Formik>        

      </div>
    </div>

    <Footer/>

    </>
  );
};

export default App;
