Notes 123
=========

Notes 123 is a notes application, that uses small components with the `yo-yo` virtual DOM module and most streams module.

It has a basic router and dispatch lib built in.

Developer Setup
---------------

```
npm install
npm run serve
```

Deployment Setup
----------------

```
npm install
npm run deploy
```

About
-----

Experiment

Building applications without frameworks and moving more towards a functional reactive approach.

Animations
----------

Since we are using an unidirectional flow, the animation is handled in two areas, one is using animate.css to easily add a class to the node you want to animate and it should be very easy.

When a dispatch is made, first a pre-dispatch is sent letting the existing component know that we are leaving, then a setTimeout waits 60 and runs the requested dispatch, this gives the opportunity for the components to perform an exit animation before the new animation begins. It is not perfect, but it does make it straight forward to add animation.

Router
------

Instead of using other routers, I wanted to simplify the problem. I wanted to think more about state and less about routing, so I grabbed the two event triggers for routing:

- clicking on a hyperlink
- popstate

By streaming these events to a dispatch function will guarantee all events are processed through the dispatch function to create a global state object.

Then when the state object is being rendered, I wanted to provide a simple routing structure. With basic crud you tend to come across the need to mirror whats on the server:

/list
/new
/:id
/:id/edit

etc, and I proceeded down that path but when I started to look at the code it takes to just identify if there is an alias on the the command, I thought a little differently.  Why not

`/show?id=1234`

This handles the same use case, but the browser already separates these two concerns on the dom:

- pathname = '/show'
- search = '?id=1234'

So basically, I used that process to do all my routes and during the hyperlink click stream event I manage the search clause by converting to json params.

The other issue I ran into was wanting to redirect and not actually produce a new render.

`/put?redirect=true`

Again I solved it by using the additional attribute not to render a leaving fadeOut.

I really like how it turned out:

```
${Router(state, [
  { '/': List },
  { '/new': Form },
  { '/edit': Form },
  { '/show': Show },
  { '/remove': Remove }
])}
```

dispatcher
----------

The router is not much use without the dispatcher, this is very similar to flux and redux, but not a complicated. It simply takes a basic state and a update command that just needs the state, then it will worry about rendering.
