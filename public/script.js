function validateForm(event) {
  const permission = confirm("Do you really want to delete?");
  if (permission) {
  } else {
    event.preventDefault();
  }
}
