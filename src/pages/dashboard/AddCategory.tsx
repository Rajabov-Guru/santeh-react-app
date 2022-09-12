import React from 'react';
import ContentLayout from "../../components/dashboard/ContentLayout";
import CategoryForm from "../../components/dashboard/forms/AddCategoryForm";

const AddCategory = () => {
    return (
        <ContentLayout>
            <CategoryForm/>
        </ContentLayout>
    );
};

export default AddCategory;