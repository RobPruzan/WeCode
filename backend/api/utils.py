def filter_data(item_to_filter):
    if item_to_filter is None:
        return None
    filtered_item = str(item_to_filter).replace("}", "")
    return filtered_item
