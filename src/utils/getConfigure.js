const getConfigure = () => ({
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
});

export default getConfigure;