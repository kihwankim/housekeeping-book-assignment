<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\HouseKeepModel;

class Data extends ResourceController
{
    use ResponseTrait;

    private $startTime = "00:00:00";
    private $endTime = "23:59:59";

    public function findById($id)
    {
        $houseKeepingModel = new HouseKeepModel();
        $houseKeepDataById = $houseKeepingModel->find($id);
        $data['housekeep'] = $houseKeepDataById;
        return $this->respond($data);
    }

    public function findByStartDateAndEndDate($startDate, $endDate)
    {
        $startDatetime = $this->combineDateAndTime($startDate, $this->startTime);
        $endDatetime = $this->combineDateAndTime($endDate, $this->endTime);
        $houseKeepingModel = new HouseKeepModel();
        $monthData = $houseKeepingModel
                ->where('use_at >=', $startDatetime)->where('use_at <=', $endDatetime)->find();
        $data['events'] = $monthData;
        $data['start'] = $startDatetime;
        $data['end'] = $endDatetime;
        
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
                'use_at' => $this->combineDateAndTime($_POST['use_at'], $_POST['time'].":00"),
                'spent_type' => $_POST['spent_type']
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
                'use_at' => $this->combineDateAndTime($_POST['use_at'], $_POST['time'].":00"),
                'spent_type' => $_POST['spent_type']
            ];
            $houseKeepingModel->save($houseKeepData);
            
            return $this->respondCreated($_POST['id']);
        }
        
        return $this->failNotFound($_POST['id']);
    }

    private function combineDateAndTime($date, $time)
    {
        return $date." ".$time;
    }
}
?>