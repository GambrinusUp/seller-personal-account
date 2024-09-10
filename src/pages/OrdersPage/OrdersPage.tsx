import useFetch from '../../hooks/useFetch';

function OrdersPage() {
    const { data, loading, error } = useFetch(
        'http://localhost:8000/advertisements'
    );

    return (
        <div>
            {loading && <p>{loading}</p>}
            {error && <p>{error}</p>}
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    );
}

export default OrdersPage;
