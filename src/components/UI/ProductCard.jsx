import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { favActions } from '../../redux/slices/favSlice';
import ProductModal from './ProductModal'; // Adjust the import path
import '../../styles/product-card.css'

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemOff = (price) => {
    const discountedPrice = Math.floor(2 * price);
    return discountedPrice;
  };

  const discountedPrice = itemOff(item.price);

  const addToCart = () => {
    if ((item.availableSizes && item.availableSizes.length > 0 && !selectedSize) ||
        (item.availableColors && item.availableColors.length > 0 && !selectedColor)) {
      // Show the modal to select size and color
      setIsModalOpen(true);
      return;
    }

    if (item.availableSizes && item.availableSizes.length > 0) {
      if (!selectedSize) {
        toast.error('Please select a size.');
        return;
      }
    }
    if (item.availableColors && item.availableColors.length > 0) {
      if (!selectedColor) {
        toast.error('Please select a color.');
        return;
      }
    }

    const newItem = {
      id: item.id,
      title: item.title,
      price: item.price,
      imgUrl: item.imgUrl,
      quantity: 1,
      availableSizes: item.availableSizes,
    };

    dispatch(cartActions.addItem(newItem));
    setSelectedSize('');
    setSelectedColor('');

    // Close the modal after adding the item to the cart
    setIsModalOpen(false);
    

    toast.success('Product added successfully');
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const addToFavorites = () => {
    dispatch(
      favActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        imgUrl: item.imgUrl,
        availableSizes: item.availableSizes,
      })
    );

    toast.success('Product Added to Favorites');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Col lg='3' md='4' className='mb-2 grey'>
      <div className='product__item'>
        <Link to={`/shop/${item.id}`}>
          <div className='product__img'>
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt=''
              style={{ height: 400, objectFit: 'contain' }}
            />
            
          </div>
        </Link>
        <div className='p-2 product__info'>
          <Link to={`/shop/${item.id}`}>
            <h3 className='product__name'>{item.title}</h3>
          </Link>
          <span>{item.category}</span>
          
        </div>
        <div className='product__card-bottom d-flex align-items-center justify-content-between p-2'>
          <div className='price0'>
            <span className='off'><strike>Rs.{discountedPrice}</strike></span>
            <span className='price'>Rs.{item.price}</span>
          </div>
          <motion.span
            className='h_a'
            whileHover={{ scale: 1.2 }}
            onClick={addToFavorites}
          >
            <i className='helo ri-heart-add-line'></i>
          </motion.span>
          <motion.span
            className=''
            whileHover={{ scale: 1.2 }}
            onClick={addToCart}
          >
            <i className='ri-add-line'></i>
          </motion.span>
        </div>

        {/* Modal for selecting size and color */}
        <ProductModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          availableSizes={item.availableSizes}
          availableColors={item.availableColors}
          onSizeSelect={handleSizeSelection}
          onColorSelect={handleColorSelection}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          addToCart={addToCart}
          imgUrl={item.imgUrl}
          title={item.title}
          id={item.id}
          
        />
      </div>
    </Col>
  );
};

export default ProductCard;
