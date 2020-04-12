require 'test_helper'

class BoggleFlowTest < ActionDispatch::IntegrationTest
   test "can see the welcome page" do
    get "/"
    assert_response :success
  end
end
