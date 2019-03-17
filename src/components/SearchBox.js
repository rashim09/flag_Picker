import React, { Component } from 'react';
import '../style/sass/3-modules/_searchBox.sass';

class SearchBox extends Component {
  state = {
    selectedItems: '',
    isDropdownExpanded: false,
    query: ''
  }
  componentDidMount = () => document.addEventListener('click', this.handleClickOutside);

  componentWillUnmount = () => document.removeEventListener('click', this.handleClickOutside);



  setWrapperRef = (node) => this.wrapperRef = node;

  /** 
   *   This function gets triggered when ever user types in the Search Box
   */
  onInputChange = (e) => {
    e.stopPropagation();
    this.setState({ query: this.search.value });
  }
  /*
   *   Utility funtion to return the filtered list of isSelected = true
   */
  getIsSelectedItemsFromAList = (list) => (list && list.filter(data => data.isSelected)) || [];

  /*
   *   Utility funtion to return the filtered list of based on the user typehead in the Search box
  */
  filterSearch = (data) => (data && (data.isSelected || data.name.toLowerCase().indexOf(this.state.query.toLowerCase()) >= 0));


  /*
  *   This functions handles and items selected based on props multiple
  */
  itemOnSelection = (evt) => {
    evt.stopPropagation();
    (this.props.multiple) ? this.handleMultiSelection(evt) : this.handleSelection(evt);
  }

  /*
    *   This functions handles the item selected
    */
  handleSelection = (evt) => {
    this.sendSelectedValueToParent(evt.target.textContent);
    this.updateSelectedItem(evt.target.textContent);
    this.setIsDropDownOptions(!this.state.isDropdownExpanded);
  }


  /*
    *   This functions handles the multiple items selected
    */
  handleMultiSelection = (evt) => {
    let list = this.props.source;
    let element = evt.target.querySelector("input");

    (!element) ? element = evt.target : element.checked = !element.checked;
    list.filter(x => x.name.indexOf(element.value) >= 0).map(y => y.isSelected = element.checked);

    this.sendSelectedValueToParent(list);
    this.updateSelectedItem(element.value);
  }

  /*
   *   Utility funtion to update the State Variable isDropdownExpanded
   */
  setIsDropDownOptions = (value) => this.setState({ isDropdownExpanded: value }, () => this.clearFilteredSearch());

  sendSelectedValueToParent = (data, isUnSelected = false) => (this.props.multiple)
    ? this.props.selectedCheckedList(data)
    : this.props.selectedTextOnClick(data, isUnSelected);

  /*
   *   Clears the Autocomplete dropdown search box
   */
  clearFilteredSearch = () => this.setState({ query: "" }, () => this.search.value = "");

  /*
   *   Utility funtion to update the State Variable SelectedItem
   */
  updateSelectedItem = (item) => this.setState({ selectedItem: item });



  render() {

    const searchBox = (
      <input
        type="search"
        placeholder={this.props.placeholder}
        className="dropdown-search"
        ref={input => this.search = input}
        onChange={(evt) => this.onInputChange(evt)}
        onClick={() => this.setIsDropDownOptions(!this.state.isDropdownExpanded)}
      />
    );


    const autoCompleteItems = (
      this.props.source && this.props.source.filter(this.filterSearch).map((data, index) => (
        <li 
        className="dropdown-items-selected"
         name="dropdown-items"
          key={index}
          value={data.name}
          onClick={(evt) => this.itemOnSelection(evt)}>
          {
            (this.props.multiple)
              ? (
                <span>
                  <input checked={data.isSelected}
                    type="checkbox"
                    value={data.name} />
                  {data.name}
                </span>
              )
              : (
                <span>{data.name}</span>
              )
          }
        </li>
      ))
    );




    return (
      <div className="search-box" ref={this.setWrapperRef}>
        <div className="dropdown-container">
          {searchBox}
          <div className={`dropdown-list ${(!this.state.isDropdownExpanded) ? "toggle" : ""} `} >
            <ul className="dropdown-list-items">
              {autoCompleteItems}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

SearchBox.defaultProps = {
  multiple: false,
  name: "searchbox",
  disabled: false,
  placeholder: "Search",
  source: []
}

export default SearchBox;