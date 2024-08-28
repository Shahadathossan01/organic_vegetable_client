import ReviewItem from "../ReviewItem/ReviewItem";

const ProductReview = ({review}) => {
    
    return (
        <>
            <h1>Product Review</h1>
            {
                review.length==0?(
                    <h1 style={{textAlign:'center'}}>No Review Yet!</h1>
                ):(
                    <div style={{display:'flex',gap:'20px',flexWrap:'wrap',justifyContent:'center',backgroundColor:'#C0C0C0',padding:'10px',}}>
                        {
                        review.map(item=>(
                            <ReviewItem key={item._id} item={item}></ReviewItem>
                        ))
                    }
                    </div>
                )
            }
        </>
    );
};

export default ProductReview;