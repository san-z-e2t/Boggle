require 'test_helper'

class BogglesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get boggles_index_url
    assert_response :success
  end

end
