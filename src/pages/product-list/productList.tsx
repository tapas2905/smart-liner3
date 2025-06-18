import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './productList.module.scss';
import api from '../../services/api';
import { ProductListViewType } from '../../types/productType';
import noProductImage from '../../assets/images/No-Product-Image-Available.png';
import Pagination from '@mui/material/Pagination';
import { ProductListInterface } from '../../interfaces/productInterface';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductListInterface[]>([]);
  const [viewListType, setViewListType] = useState<ProductListViewType>('gridView');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(28);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const delay = 300;
  useEffect(() => {
    getProducts();
  }, [page, size, keyword]);
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`product/list?page=${page}&page_size=${size}${keyword ? `&keyword=${keyword}` : ''}`);
      if (res.status === 200) {
        setProducts(res.data.items);
        setTotalPage(res.data?.totalPages || 0);
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };
  const selectListViewType = (type: ProductListViewType) => {
    setViewListType(type);
  }
   const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      setKeyword(inputValue);
      setPage(1);
    }, delay);
    // Clean up the previous timer if inputValue changes before the delay
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
                        type="search"
                        placeholder="Search by SKU"
                        value={inputValue}
                        onChange={handleKeywordChange}
                      />
                      <img
                        src='images/search-icon.svg'
                        alt='search icon'
                        className={styles.productSrchIcon}
                       />
                    </form>
                  </li>
                  <li className={styles.productGridListView} onClick={() => selectListViewType('gridView')}>
                      <img src='images/grid-view-icon.svg' alt='grid view icon' />
                  </li>
                  <li className={styles.productGridListView} onClick={() => selectListViewType('listView')}>
                      <img src='images/list-view-icon.svg' alt='list view icon' />
                  </li>
                  {/* <li className={styles.productSort}>
                    <select name="cars" id="cars">
                      <option value="volvo">Sort by (Defaut)</option>
                      <option value="saab">Saab</option>
                      <option value="mercedes">Mercedes</option>
                      <option value="audi">Audi</option>
                    </select>
                  </li> */}
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
        { viewListType === 'gridView' && (
          <div className={styles.productGridViewPrt}>
          <div className={styles.container}>
            <ul>
              {products.map((product: ProductListInterface) => (
               <li key={product.sku_id}>
                <img src={product.main_wb || noProductImage} alt='product img' /> 
                <div className={styles.productGridTextArea}>
                  <h3>{product?.year_start && product?.year_end ? `${product?.year_start} - ${product?.year_end}` : ''} {product.make || ''} {product.model || ''}</h3>
                  <div className={styles.productGridPriceRow}>
                    <h4>{product.sku}</h4>
                    <p>
                      {/* <span className={styles.productGridOldPrice}>$52.99</span> */}
                      <span className={styles.productGridCurrentPrice}>{product.cost_avg ? `$${product.cost_avg}` : ""}</span>
                    </p>
                  </div>
                </div>
                <div className={product.inventory_quantity > 0 ? styles.productGridStockBtn : styles.productGridSoldBtn}>
                  {product.inventory_quantity > 0 ? (<p><span>{product.inventory_quantity}</span> Stock</p>) : (<p>Sold Out</p>)}
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
        )}

        {/* Product List View Area */}
        {viewListType === 'listView' && (
          <div className={styles.productListViewPrt}>
          <div className={styles.container}>
            <div className={styles.tableHead}>
              <ul>
                <li>Image</li>
                <li>SKU</li>
                <li>Product Title</li>
                <li>Stock</li>
                {/* <li>MSRP</li> */}
                <li>Your Cost</li>
              </ul>
            </div>
            {products.map((product: any, ind: number) => (
               <div className={styles.tableRow}>
              <ul>
                <li data-label="Image">
                  <img src={product.main_wb || noProductImage} alt='product img' />
                </li>

                <li data-label="SKU">
                  <p>{product.sku}</p>
                </li>
                <li data-label="Product Title">
                  <p><strong>{product?.year_start && product?.year_end ? `${product?.year_start} - ${product?.year_end}` : ''}</strong> {product.make || ''} {product.model || ''}</p>
                </li>
                <li data-label="Stock">
                  {product.inventory_quantity > 0 ? (<p><strong>{product.inventory_quantity} </strong>Items Available</p>) : (<p>Sold Out</p>)}
                </li>
                {/* <li data-label="MSRP">
                  <p>$52.00</p>
                </li> */}
                <li data-label="Your Cost">
                  <p>{product.cost_avg ? `$${product.cost_avg}` : ""}</p>
                </li>
              </ul>
            </div>
            ))}
          </div>
        </div>
        )}
        {products.length === 0 && !loading && <p>No product available.</p>}
        {products.length > 0 && <Pagination variant="outlined" shape="rounded" count={totalPage} page={page} onChange={handlePageChange} />}
      </div>

      <Footer/>
    </>
  );
};
export default ProductList;
