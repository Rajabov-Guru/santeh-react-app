import React from 'react';
import ContentLayout from "../../components/dashboard/ContentLayout";
import CategoryForm from "../../components/dashboard/forms/AddCategoryForm";
import EditCategoryForm from "../../components/dashboard/forms/EditCategoryForm";

const EditCategory = () => {
    return (
        <ContentLayout>
            <EditCategoryForm/>
        </ContentLayout>
    );
};

export default EditCategory;