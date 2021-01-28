export const FormDelete = (emp) => {
    //console.log("->"+emp.name.length);
    return (
        <>
        <p>
            Are you sure you want to delete {emp.name+","} coach? If you delete coach’s account, all data associated with this profile will permanently deleted.
        </p>
        </>
    );
}
