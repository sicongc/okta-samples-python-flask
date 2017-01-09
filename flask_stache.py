# -*- coding: utf-8 -*-
# FIXME: This file has been modified from the original to support Mustache partials.
#        Either send patch upstream, or find other way to handle these changes.
"""
    flask_stache
    ~~~~~~~~~~~~

    Simple mustache templating for Flask applications

    :copyright: (c) 2012 by Matt Wright.
    :license: MIT, see LICENSE for more details.
"""
import os

from flask import request, current_app as app

from pystache.renderer import Renderer


def _get_renderer(append=None, partials=None):
    append = append or []

    bp = app.blueprints.get(request.blueprint, None)

    if not bp or not bp.template_folder:
        dirs = [os.path.join(app.import_name, app.template_folder, *append)]
    else:
        path = bp.import_name.split('.') + [bp.template_folder]
        dirs = [os.path.join(*path + append)]
    _partials = {}
    for key, value in partials.iteritems():
        _partials[key] = Renderer(search_dirs=dirs).load_template(value)
    
    return Renderer(search_dirs=dirs, partials=_partials)


def render_view(view):
    """Render a view object

    :param view: The view object to render
    """
    return _get_renderer().render(view)


def render_template(template, partials=None, **context):
    """Renders a given template and context.

    :param template: The template name
    :param context: the variables that should be available in the
                    context of the template.
    """
    parts = template.split('/')
    renderer = _get_renderer(parts[:-1], partials=partials)
    return renderer.render(renderer.load_template(parts[-1:][0]), context)
