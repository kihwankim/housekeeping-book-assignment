<?php namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		return view('calendar');
	}

	public function createNewDataPage()
	{
		return view('new');
	}

	public function editDataPage($id)
	{
		return view('edit_write');
	}
}
