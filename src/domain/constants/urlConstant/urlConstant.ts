const urlConstant = {
  tickets: {
    book: "/book",
    cancel: "/cancel/:ticketId",
    booked: "/booked/:ticketId",
    available: "/available/:trainId",
    final_chart_prepared: "/final_chart_prepared/:trainId",
  },
  passenger: {
    create_passenger: "/create_passenger",
  },
  train: {
    create_trainDetails: "/create_trainDetails",
  },
  user: {
    create_user: "/create_user",
    update_user: "/update_user",
    delete_user: "/delete_user",
    get_user: "/get_user/:id",
    get_all_user: "/get_all_users",
    search_user_details: "/search_user_details",
    filter_user_data: "/filter_user_data",
    get_user_data: "/get_user_data",
  },
};
export default urlConstant;
