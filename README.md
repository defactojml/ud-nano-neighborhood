Paris Touristic places
===================


Here's the up-to-date version of P5 for Udacity's FEND.

This is a map representation of the most touristic places in Paris.



Technology
-------------
This project is developed using :

 - knockoutJS

 - lodash

 - jquery

----------


Specifics about the project
-------------
There was a focus during implementation to return only relvant flick photos

The implementation is the following:

- The name of the tourist place are translated into tags for the flickr API

- A initial request is made using flickr.photos.search with results

- for each successful element initially returned, we check that all the tags are found in the title of the element

- out of this filtered structure, we take the first MAX_NUMBER elements (check the constant MAX_NUMBER)

- a photo is selected randomnly out of the MAX_NUMBER elements



How-To
-------------------

 1. Clone the git repository https://github.com/defactojml/ud-nano-neighborhood
 2. Run the index.html
