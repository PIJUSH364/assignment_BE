const urlConstant = {

  tickets: {
    book: "/book",
    cancel: "/cancel/:ticketId",
    booked: "/booked/:ticketId",
    available: "/available/:trainId",
  },
  passenger: {
    create_passenger: "/create_passenger",
  },
  train: {
    create_trainDetails: "/create_trainDetails",
  }
};
export default urlConstant;
