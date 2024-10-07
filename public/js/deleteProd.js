document.querySelectorAll('.delete-form').forEach(form => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const productId = form.action.split('/').pop();

        try {
            const response = await fetch(`/products/admin/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Product successfully deleted.");
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Error deleting product: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("An error occurred while deleting the product:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    });
});
