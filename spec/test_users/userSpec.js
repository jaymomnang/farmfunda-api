describe("User", function() {
  var User = require('../../models/usersModel');
  var user;

  beforeEach(function() {
    user = new User();
  });

  it("should be able to load all registered users", function() {
    user.get_users();
    expect(user.get_users).toEqual(any);

    //demonstrates use of custom matcher
    //expect(player).toBePlaying(song);
  });

  
  // demonstrates use of spies to intercept and test method calls
  //it("tells the current song if the user has made it a favorite", function() {
  //  spyOn(song, 'persistFavoriteStatus');

  //  player.play(song);
  //  player.makeFavorite();

  //  expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  //});

  //demonstrates use of expected exceptions
  //describe("#resume", function() {
  //  it("should throw an exception if song is already playing", function() {
  //    player.play(song);

  //    expect(function() {
  //      player.resume();
  //    }).toThrowError("song is already playing");
  //  });
  //});
});
