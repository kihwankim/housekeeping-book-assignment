<?php namespace App\Models;

use CodeIgniter\Model;

class HouseKeepModel extends Model
{
    protected $table = 'housekeepingbook';
    protected $primaryKey = 'id';

    protected $allowedFields = [ 'use_at', 'price', 'description', 'spent_type'];
}
?>