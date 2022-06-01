import '../styles/propertyhelper.css';

const PropertyHelper = ({image, info}) => {
    return ( 
        <div className="card">
           <img className="image" src={image} alt=""/>    
           <h2 className="info">{info}</h2>
        </div>
     );
}
 
export default PropertyHelper;