<?php
use App\Models\NewArrival;
use Illuminate\Http\Request;

class NewArrivalController extends Controller
{
    public function index() {
        return NewArrival::all();
    }

    public function store(Request $request) {
        $data = $request->validate([
            'title' => 'required|string',
            'subtitle' => 'required|string',
            'image' => 'required|image'
        ]);

        $path = $request->file('image')->store('new-arrivals', 'public');
        $data['image'] = $path;

        return NewArrival::create($data);
    }

    public function update(Request $request, NewArrival $newArrival) {
        $data = $request->validate([
            'title' => 'required|string',
            'subtitle' => 'required|string',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('new-arrivals', 'public');
            $data['image'] = $path;
        }

        $newArrival->update($data);
        return $newArrival;
    }

    public function destroy(NewArrival $newArrival) {
        $newArrival->delete();
        return response()->json(['message' => 'Deleted']);
    }
}