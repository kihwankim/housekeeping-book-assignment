<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\HouseKeepModel;

class Data extends ResourceController
{
    use ResponseTrait;

    public function findByYearAndMonth()
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $year = $this->request->getVar("year");
        $month = $this->request->getVar("month");
        $houseKeepingModel = new HouseKeepModel();
        // $monthData = $houseKeepingModel->where('year(use_at)', $year)->where('month(use_at)', $month)->findAll();
        $monthData = $houseKeepingModel->findAll();
        $data['events'] = $monthData;
        return $this->respond($data);
    }

    public function createNewHouseKeepingBook()
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        
        if($this->request->getMethod() == 'post')
        {
            $houseKeepingModel = new HouseKeepModel();
            $houseKeepingModel->save($_POST);
        }
        return redirect()->to('/housekeeping-book/public/index.php/home/');
    }
}
?>