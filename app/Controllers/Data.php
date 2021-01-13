<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\HouseKeepModel;

class Data extends ResourceController
{
    use ResponseTrait;

    public function findById($id)
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $houseKeepingModel = new HouseKeepModel();
        $houseKeepDataById = $houseKeepingModel->find($id);
        $data['housekeep'] = $houseKeepDataById;
        return $this->respond($data);
    }

    public function findByYearAndMonth()
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $houseKeepingModel = new HouseKeepModel();
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
            $houseKeepData = [
                'price' => $_POST['price'],
                'description' => $_POST['description'],
                'use_at' => $this->combineDateAndTime($_POST['use_at'], $_POST['time'])
            ];
            $houseKeepingModel->save($houseKeepData);
        }
        return redirect()->to('/housekeeping-book/public/index.php/home/');
    }

    public function deleteById($id)
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        $houseKeepingModel = new HouseKeepModel();
        $houseKeepData = $houseKeepingModel->find($id);
        
        if($houseKeepData){
            $houseKeepingModel->delete($id);
            return $this->respondDeleted($houseKeepData);
        }
        
        return $this->failNotFound($id);
    }

    public function editHouseKeepData()
    {
        header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        if($this->request->getMethod() == 'post')
        {
            $houseKeepingModel = new HouseKeepModel();
            $houseKeepData = [
                'id' => $_POST['id'],
                'price' => $_POST['price'],
                'description' => $_POST['description'],
                'use_at' => $this->combineDateAndTime($_POST['use_at'], $_POST['time'])
            ];
            $houseKeepingModel->save($houseKeepData);
        }
        
        return redirect()->to('/housekeeping-book/public/index.php/home/');
    }

    private function combineDateAndTime($date, $time)
    {
        return $date." ".$time.":00";
    }
}
?>