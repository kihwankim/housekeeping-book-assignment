<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\HouseKeepModel;

class Data extends ResourceController
{
    use ResponseTrait;

    public function findById($id)
    {
        $houseKeepingModel = new HouseKeepModel();
        $houseKeepDataById = $houseKeepingModel->find($id);
        $data['housekeep'] = $houseKeepDataById;
        return $this->respond($data);
    }

    public function findByYearAndMonth()
    {
        $houseKeepingModel = new HouseKeepModel();
        $monthData = $houseKeepingModel->findAll();
        $data['events'] = $monthData;
        
        return $this->respond($data);
    }

    public function createNewHouseKeepingBook()
    {
        if($this->request->getMethod() == 'post')
        {
            $houseKeepingModel = new HouseKeepModel();
            $houseKeepData = [
                'price' => $_POST['price'],
                'description' => $_POST['description'],
                'use_at' => $this->combineDateAndTime($_POST['use_at'], $_POST['time'])
            ];
            $result = $houseKeepingModel->insert($houseKeepData);

            return $this->respondCreated($result);
        }
        
        throw new \CodIgniter\Database\Exception\DatabaseException();
    }

    public function deleteById($id)
    {
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
            
            return $this->respondCreated($_POST['id']);
        }
        
        return $this->failNotFound($_POST['id']);
    }

    private function combineDateAndTime($date, $time)
    {
        return $date." ".$time.":00";
    }
}
?>