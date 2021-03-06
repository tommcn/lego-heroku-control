#!/usr/bin/env python


import unittest
from app import app


class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_home_page_works(self):
        rv = self.app.get('/')
        self.assertTrue(rv.data)
        self.assertEqual(rv.status_code, 200)
    
    def test_static_css_exists(self):
        rv = self.app.get('/static/main.css')
        self.assertTrue(rv.data)
        self.assertEqual(rv.status_code, 200)
        rv.close()
    
    def test_static_js_exists(self):
        rv = self.app.get('/static/main.js')
        self.assertTrue(rv.data)
        self.assertEqual(rv.status_code, 200)
        rv.close()


if __name__ == '__main__':
    unittest.main()
