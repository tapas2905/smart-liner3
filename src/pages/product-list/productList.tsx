import React from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './productList.module.scss';

const ProductList: React.FC = () => {
  

  return (
    <>
      <Header/>

      <div className={styles.productListBdyPrt}>
        
        {/* Product List Header Area */}
        <div className={styles.productListHdrPrt}>
          <div className={styles.container}>
            <div className={styles.productListHdrRow}>
              <div className={styles.productListTitle}>
                <h1>Product List</h1>
              </div>
              <div className={styles.productListRightPrt}>
                <ul>
                  <li className={styles.productSearchField}>
                    <form>
                      <input
                        name="email"
                        type="email"
                        placeholder="Search by SKU or product title"
                      />
                      <img
                        src='images/search-icon.svg'
                        alt='search icon'
                        className={styles.productSrchIcon}
                       />
                    </form>
                  </li>
                  <li className={styles.productGridListView}>
                    <Link to={'#'}>
                      <img src='images/grid-view-icon.svg' alt='grid view icon' />
                    </Link>
                  </li>
                  <li className={styles.productGridListView}>
                    <Link to={'#'}>
                      <img src='images/list-view-icon.svg' alt='list view icon' />
                    </Link>
                  </li>
                  <li className={styles.productSort}>
                    <select name="cars" id="cars">
                      <option value="volvo">Sort by (Defaut)</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </li>
                  <li className={styles.productDownloadCsv}>
                    <Link to={'#'}>
                      Download all products and CSV
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Product List Grid View Area */}
        <div className={styles.productGridViewPrt}>
          <div className={styles.container}>
            <ul>
              <li>
                <img src='images/product-image1.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image2.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
              <li>
                <img src='images/product-image3.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image4.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
              <li>
                <img src='images/product-image5.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image6.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
              <li>
                <img src='images/product-image7.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image8.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
              <li>
                <img src='images/product-image1.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image2.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
              <li>
                <img src='images/product-image3.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridStockBtn}>
                  <p><span>15</span> Stock</p>
                </div>
              </li>
              <li>
                <img src='images/product-image4.png' alt='product img' />
                <div className={styles.productGridTextArea}>
                  <h3>2021-2023 fit floor CR-mats</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>SA0401/SB401</h4>
                    <p>
                      <span className={styles.productGridOldPrice}>$52.99</span>
                      <span className={styles.productGridCurrentPrice}>$49.99</span>
                    </p>
                  </div>
                </div>
                <div className={styles.productGridSoldBtn}>
                  <p>Sold Out</p>
                </div>
              </li>
            </ul>
          </div>
        </div>




        {/* Product List View Area */}
        <div className={styles.productListViewPrt}>
          <div className={styles.container}>
            <div className={styles.tableHead}>
              <ul>
                <li>Image</li>
                <li>SKU</li>
                <li>Product Title</li>
                <li>Stock</li>
                <li>MSRP</li>
                <li>Your Cost</li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image1.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image2.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image3.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image4.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image5.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image6.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image7.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

            <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src='images/product-image8.png' alt='product img' />
                </li>
                <li data-label="SKU">
                  <p>SA0401/SB401/DO415</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>2021-2023 </strong>fit floor CR-mats</p>
                </li>
                <li data-label="Stock">
                  <p><strong>15 </strong>Items Available</p>
                </li>
                <li data-label="MSRP">
                  <p>$52.00</p>
                </li>
                <li data-label="Your Cost">
                  <p>$50.00</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
      </div>

      <Footer/>
    </>
  );
};
export default ProductList;
