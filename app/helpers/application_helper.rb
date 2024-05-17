module ApplicationHelper
  def is_map_page?
      controller_name == "map_pages" && action_name == "map"
  end
end
