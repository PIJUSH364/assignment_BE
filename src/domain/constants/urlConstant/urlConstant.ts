const urlConstant = {
  contact: {
    create_contact: "/create_contact",
    delete_contact: "/delete_contact/:id",
    update_contact: "/update_contact/:id",
    find_contact: "/find_contact/:query",
    all_contact: "/all_contact",
    count_category: "/count_category",
  },
  tickets: {
    book: "/book",
    cancel: "/cancel/:ticketId",
    booked: "/booked",
    available: "/available",
  },
  passenger: {
    create_passenger: "/create_passenger",
  }
};
export default urlConstant;
