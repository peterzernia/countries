import React from 'react'
import { shallow, mount } from 'enzyme'
import TripReport from '../TripReport'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const country = {
  "id": 2,
  "currencies": [
      {
          "code": "EUR",
          "name": "European Euro",
          "symbol": "€"
      }
  ],
  "languages": [
      {
          "iso639_1": "sv",
          "name": "Swedish",
          "native_name": "svenska"
      }
  ],
  "regional_blocs": [
      {
          "acronym": "EU",
          "name": "European Union",
          "other_acronyms": null,
          "other_names": null
      }
  ],
  "name": "Aland Islands",
  "top_level_domain": [
      ".ax"
  ],
  "alpha2code": "AX",
  "alpha3code": "ALA",
  "calling_codes": [
      "358"
  ],
  "capital": "Mariehamn",
  "alt_spellings": [
      "AX",
      "Aaland",
      "Åland",
      "Ahvenanmaa"
  ],
  "region": "Europe",
  "subregion": "Northern Europe",
  "population": 28875,
  "latlng": [
      60.116667,
      19.9
  ],
  "demonym": "Ålandish",
  "area": 1580.0,
  "gini": null,
  "timezones": [
      "UTC+02:00"
  ],
  "borders": [],
  "native_name": "Åland",
  "numeric_code": "248",
  "flag": "https://restcountries.eu/data/ala.svg",
  "cioc": null
}

describe('<TripReport />', () =>{
  it('displays an image and button', () => {
    const image = "http://test.com/test.jpg";
    const countries = [country];
    const author = { username: "Test", home: country };
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        image={image} author={author} favoriters={favoriters} countries={countries}
      />
    );
    // Finds the action to open image if there is an image
    expect('action' in wrapper.find(CardHeader).props()).toEqual(true);
    wrapper.setProps({ image: null });
    expect('action' in wrapper.find(CardHeader).props()).toEqual(false);
  });
  it('displays correct button when favorited and handles click', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const handleClick = jest.fn();
    // props.favoriters includes pk
    const pk = 1;
    const favoriters = [1];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries} pk={pk}
        handleClick={handleClick}
      />
    );
    // Should display favorited button.
    expect(wrapper.find(FavoriteIcon).length).toEqual(1);
    expect(wrapper.find(FavoriteBorderIcon).length).toEqual(0);
    wrapper.find(IconButton).at(0).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('displays correct button when not favorited and handles click', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const handleClick = jest.fn();
    const openNotAuthModal = jest.fn();
    // props.favoriters does not includes pk
    const pk = 1;
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries} pk={pk}
        handleClick={handleClick} authenticated={true} openNotAuthModal={openNotAuthModal}
      />
    );
    // Should display not favorited button.
    expect(wrapper.find(FavoriteIcon).length).toEqual(0);
    expect(wrapper.find(FavoriteBorderIcon).length).toEqual(1);
    wrapper.find(IconButton).at(0).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(openNotAuthModal).toHaveBeenCalledTimes(0);
    // When not authenticated clicking button calls the other function, openNotAuthModal.
    wrapper.setProps({ authenticated: false })
    wrapper.find(IconButton).at(0).simulate('click');
    expect(openNotAuthModal).toHaveBeenCalledTimes(1);
  });
  it('opens CopyLinkModal', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const openCopyLinkModal = jest.fn();
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries}
        openCopyLinkModal={openCopyLinkModal}
      />
    );
    wrapper.find(IconButton).at(1).simulate('click');
    expect(openCopyLinkModal).toHaveBeenCalledTimes(1);

  });
  it('opens CountryModal', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const openCountryModal = jest.fn();
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries}
        openCountryModal={openCountryModal}
      />
    );
    expect(wrapper.find(Button).length).toEqual(1);
    wrapper.find(Button).simulate('click');
    expect(openCountryModal).toHaveBeenCalledTimes(1);
    // Displays a button for every country.
    wrapper.setProps({ countries: [] })
    expect(wrapper.find(Button).length).toEqual(0);
    wrapper.setProps({ countries: [country, country, country] })
    expect(wrapper.find(Button).length).toEqual(3);
  });
});