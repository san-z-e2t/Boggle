require 'test_helper'

class BogglesControllerTest < ActionController::TestCase
  #testing response
  test "should get index" do
    get :index  #name of action
    assert_response :success
  end

  test "should get gather_alphabets" do
    get :gather_alphabets  #name of action
    assert_response :success
  end

  # test "should get validate_word" do
  #   get :validate_word  #name of action
  #   assert_response :success
  # end

  test "should return array of alphabets" do
  	get :gather_alphabets
  	json = JSON.parse(response.body)
    assert json['data'].instance_of? Array
    assert json['data'].count == 16
  end

end
