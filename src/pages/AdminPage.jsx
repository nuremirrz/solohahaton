import React from 'react';
import AddProduct from '../components/AddProduct';
import ProductTable from '../components/ProductTable';


const AdminPage = () => {
    return (
        <div>
            <h2>Admin Page</h2>            
            <AddProduct/>
            <ProductTable/>
        </div>
    );
};

export default AdminPage;