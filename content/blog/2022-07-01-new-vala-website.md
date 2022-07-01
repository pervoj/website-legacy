+++
title = "New website for Vala"

[extra]
description = "We are working on a new website for the Vala programming language."
image = "images/posts/vala.png"
+++

I found Vala in 2020 when I was searching for some great language to make GTK apps similar to Java. After the first few moments of use I was already excited about this language. Its great integration with the GObject system ensures convenient way to use the components of GLib and GTK libraries. Unlike languages like C or Rust, GObject is here used as a native type system.

But despite all its advantages, the language is not very popular. One of the reasons is of course its dependency on GObject and therefore its limitation for use only in certain projects, mostly Linux applications. But that's not the only reason, because Vala is also losing its popularity in the GNOME project.

The first reason is definitely missing or at least for beginners not very simple documentation. And by documentation I don't mean an API description like [Valadoc](https://valadoc.org/), but rather some humanly written manual. This makes it harder for newcomers to get started with the language. Another reason is the small number of developers (specifically one who actively maintains the project). This makes the language development slow, bug fixes take a long time and new features are not added very often. And then a lack of a developer tooling, that would make the programmer's job easier. Whether it's a linter or a project / dependency manager.

The language is therefore not gaining many new users and is gradually losing its current ones. The main thing that keeps it alive is the [Elementary OS](https://elementary.io/) project, which relied on Vala as the key to its success, and now all its components are written in this language. Next, definitely the applications, which are already written in Vala and whose developers don't want to rewrite them. And finally, people who love the language and voluntarily stay with it. And it was these people who decided to take the situation into their own hands, gradually put things right and restore the language to its former popularity.

The resulting project is a new [language website](https://vala.dev/) together with a [user manual](https://lwildberg.pages.gitlab.gnome.org/vala-tutorial/). Work on the project began in March 2021 [Nahuel Gomez Castro](https://github.com/nahuelwexd), but it wasn't until April 2022 that more interest was shown. The project was taken by [Colin Kiama](https://github.com/colinkiama) and, as you can see from the activity graph, the project has really taken off.

![the project activity](/images/posts/new-vala-website/activity.png)

Other people contributed to the project, such as [Lorenz Wildberg](https://github.com/lw64), [Darshak Parikh](https://github.com/dar5hak), [Marki](https://github.com/Marki2019) and myself. Then also [Ben Iofel](https://github.com/benwaffle) and [Princeton Ferro](https://github.com/Prince781), who bought the domains.

Along with the language website project, Lorenz Wildberg also started working on a user manual, which includes chapter-by-chapter tutorials, and language support in [Sonny Piers](https://github.com/sonnyp)' [Workbench](https://flathub.org/apps/details/re.sonny.Workbench) application. Newcomers can now easily learn the language and try everything out comfortably without having to install a large number of tools.

The aim of these steps is to attract other users to the language to develop their applications in it and possibly contribute to the language itself.

The final official release of the site is scheduled for [July 15](https://gitlab.gnome.org/GNOME/vala/-/commit/68986811db7b23c1c3b652cbee34fd45c62c2c6e). For July 22 is scheduled a [talk](https://events.gnome.org/event/77/contributions/298/) at this year's GUADEC conference, that will be given by Princeton Ferro. So if you haven't registered for GUADEC yet, be sure to [do so](https://events.gnome.org/event/77/registrations/44/).
