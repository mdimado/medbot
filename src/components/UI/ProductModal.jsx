import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../styles/product-card.css';
import { toast } from 'react-toastify';



const ProductModal = ({ isOpen, closeModal, availableSizes, availableColors, onSizeSelect, onColorSelect, selectedSize, selectedColor, addToCart, imgUrl, title, id }) => {
  const hasVariants = availableSizes && availableSizes.length > 0 || availableColors && availableColors.length > 0;
  

  return (
    <Modal isOpen={isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>Select Size and Color</ModalHeader>
      <ModalBody>
        <div className='img_title'>
          {/* Use Link to navigate to the product page */}
          <Link to={`/shop/${id}`}>
            <img src={imgUrl} alt={title} className='modal_img' />
          </Link>
        </div>

        {hasVariants && (
          <>
            {availableSizes && availableSizes.length > 0 && (
              <div>
                <label>Select Size:</label>
                <div className='size__buttons'>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`size__button ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => onSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableColors && availableColors.length > 0 && (
              <div>
                <label>Select Color:</label>
                <div className='color__buttons'>
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      className={`color__button ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => onColorSelect(color)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {hasVariants ? (
          <Button style={{ width: 240}} className='buy__button' onClick={addToCart}>
            Add to Cart
          </Button>
        ) : (
          <Button className='buy__button' onClick={addToCart}>
            Add to Cart
          </Button>
        )}
        <Button className='buy__button colchan' onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductModal;
