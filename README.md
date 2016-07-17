Notes 123
=========

Notes 123 is a notes application, that uses small components with the `yo-yo` virtual dom module and most streams module.

It has a basic router and dispatch lib built in.

Animations
----------

Since we are using an unidirectional flow, the animation is handled in two areas, one is using animate.css to easily add a class to the node you want to animate and it should be very easy.

When a dispatch is made, first a pre-dispatch is sent letting the existing component know that we are leaving, then a setTimeout waits 60 and runs the requested dispatch, this gives the opportunity for the components to perform an exit animation before the new animation begins. It is not perfect, but it does make it straight forward to add animation. 
