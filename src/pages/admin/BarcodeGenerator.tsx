import { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, 
  Scale, 
  Search, 
  Printer, 
  History, 
  Check,
  Package,
  IndianRupee,
  Calendar,
  Tag,
  RefreshCw,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { looseProducts, looseProductCategories, mockGeneratedBarcodes } from "@/data/looseProducts";
import { LooseProduct, GeneratedBarcode } from "@/types/inventory";

const BarcodeGenerator = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<LooseProduct | null>(null);
  const [weight, setWeight] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [generatedBarcode, setGeneratedBarcode] = useState<GeneratedBarcode | null>(null);
  const [barcodeHistory, setBarcodeHistory] = useState<GeneratedBarcode[]>(mockGeneratedBarcodes);
  const [showHistory, setShowHistory] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = looseProducts;
    
    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.nameHindi?.includes(searchQuery) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    return products;
  }, [selectedCategory, searchQuery]);

  const totalPrice = useMemo(() => {
    if (!selectedProduct || !weight) return 0;
    const weightInKg = parseFloat(weight) / 1000;
    return Math.round(selectedProduct.pricePerKg * weightInKg * 100) / 100;
  }, [selectedProduct, weight]);

  const handleGenerateBarcode = () => {
    if (!selectedProduct || !weight) return;
    
    const weightNum = parseFloat(weight);
    if (weightNum < selectedProduct.minWeight || weightNum > selectedProduct.maxWeight) {
      return;
    }

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
    const barcodeId = `bc-${Date.now()}`;
    const barcodeNumber = `SHOP001-${selectedProduct.id.toUpperCase()}-${dateStr}-${String(barcodeHistory.length + 1).padStart(3, '0')}`;
    
    const newBarcode: GeneratedBarcode = {
      id: barcodeId,
      barcodeNumber,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      shopId: 'SHOP001',
      weight: weightNum,
      pricePerKg: selectedProduct.pricePerKg,
      totalPrice,
      batchReference: `BATCH-${now.toISOString().split('T')[0]}-A`,
      generatedAt: now.toISOString(),
      isPrinted: false,
      isSold: false,
    };

    setGeneratedBarcode(newBarcode);
    setBarcodeHistory(prev => [newBarcode, ...prev]);
  };

  const handlePrintBarcode = () => {
    if (!generatedBarcode) return;
    
    // Mark as printed
    setBarcodeHistory(prev => 
      prev.map(b => b.id === generatedBarcode.id ? { ...b, isPrinted: true } : b)
    );
    setGeneratedBarcode({ ...generatedBarcode, isPrinted: true });
    
    // In production, this would trigger actual printing
    window.print();
  };

  const handleReset = () => {
    setSelectedProduct(null);
    setWeight("");
    setGeneratedBarcode(null);
  };

  const formatWeight = (grams: number) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(2)} kg`;
    }
    return `${grams} g`;
  };

  return (
    <AdminLayout title="Smart Barcode Generator" subtitle="Generate dynamic barcodes for loose products • खुले सामान के लिए बारकोड बनाएं">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowHistory(!showHistory)}
            className="gap-2"
          >
            <History className="w-4 h-4" />
            {showHistory ? 'Hide History' : 'View History'}
          </Button>
        </div>

        {showHistory ? (
          /* Barcode History View */
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Barcodes • हाल के बारकोड</CardTitle>
              <CardDescription>View and reprint generated barcodes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {barcodeHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No barcodes generated yet</p>
                ) : (
                  barcodeHistory.map((barcode) => (
                    <div 
                      key={barcode.id}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center border-2 border-dashed border-primary/30">
                          <QrCode className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{barcode.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatWeight(barcode.weight)} • ₹{barcode.totalPrice}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono mt-1">
                            {barcode.barcodeNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={barcode.isSold ? "default" : barcode.isPrinted ? "secondary" : "outline"}>
                          {barcode.isSold ? 'Sold' : barcode.isPrinted ? 'Printed' : 'Pending'}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Printer className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Selection */}
            <div className="lg:col-span-2 space-y-4">
              {/* Search */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products... खोजें..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  size="sm"
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className="whitespace-nowrap"
                >
                  All / सभी
                </Button>
                {looseProductCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    size="sm"
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="whitespace-nowrap gap-1"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Button>
                ))}
              </div>

              {/* Products Grid */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Select Product • उत्पाद चुनें</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          setSelectedProduct(product);
                          setWeight("");
                          setGeneratedBarcode(null);
                        }}
                        className={cn(
                          "relative p-3 rounded-lg border-2 text-left transition-all hover:shadow-md",
                          selectedProduct?.id === product.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {selectedProduct?.id === product.id && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        )}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-20 object-cover rounded-md mb-2"
                        />
                        <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        {product.nameHindi && (
                          <p className="text-xs text-muted-foreground">{product.nameHindi}</p>
                        )}
                        <p className="text-primary font-bold text-sm mt-1">
                          ₹{product.pricePerKg}/{product.unit === '100g' ? '100g' : 'kg'}
                        </p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Stock: {product.stockQuantity} kg
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Barcode Generation Panel */}
            <div className="space-y-4">
              {/* Weight Input */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    Enter Weight • वजन दर्ज करें
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct ? (
                    <>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">{selectedProduct.name}</p>
                        <p className="text-sm text-muted-foreground">{selectedProduct.nameHindi}</p>
                        <p className="text-primary font-bold mt-1">
                          ₹{selectedProduct.pricePerKg}/{selectedProduct.unit === '100g' ? '100g' : 'kg'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Weight (grams) • वजन (ग्राम)</label>
                        <Input
                          type="number"
                          placeholder={`${selectedProduct.minWeight} - ${selectedProduct.maxWeight} g`}
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          min={selectedProduct.minWeight}
                          max={selectedProduct.maxWeight}
                        />
                        <p className="text-xs text-muted-foreground">
                          Min: {formatWeight(selectedProduct.minWeight)} | Max: {formatWeight(selectedProduct.maxWeight)}
                        </p>
                      </div>

                      {weight && (
                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Price</span>
                            <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatWeight(parseFloat(weight))} × ₹{selectedProduct.pricePerKg}/kg
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={handleGenerateBarcode}
                          disabled={!weight || parseFloat(weight) < selectedProduct.minWeight}
                          className="flex-1 gap-2"
                        >
                          <QrCode className="w-4 h-4" />
                          Generate Barcode
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleReset}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Select a product to generate barcode</p>
                      <p className="text-sm">उत्पाद चुनें</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generated Barcode Preview */}
              {generatedBarcode && (
                <Card className="border-primary">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-primary" />
                        Barcode Ready
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => setGeneratedBarcode(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Barcode Visual */}
                    <div className="p-4 bg-white rounded-lg border-2 border-dashed border-primary/30 text-center print:border-solid">
                      <div className="space-y-2">
                        {/* Simulated barcode lines */}
                        <div className="flex justify-center gap-0.5">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-12 bg-black"
                              style={{ width: Math.random() > 0.5 ? '2px' : '1px' }}
                            />
                          ))}
                        </div>
                        <p className="font-mono text-xs text-black">{generatedBarcode.barcodeNumber}</p>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-dashed text-left text-black">
                        <p className="font-bold">{generatedBarcode.productName}</p>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Weight: {formatWeight(generatedBarcode.weight)}</span>
                          <span className="font-bold">₹{generatedBarcode.totalPrice}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          Batch: {generatedBarcode.batchReference}
                        </p>
                      </div>
                    </div>

                    {/* Barcode Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Tag className="w-4 h-4" />
                        <span>Product: {generatedBarcode.productName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Scale className="w-4 h-4" />
                        <span>Weight: {formatWeight(generatedBarcode.weight)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <IndianRupee className="w-4 h-4" />
                        <span>Price: ₹{generatedBarcode.totalPrice}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Generated: {new Date(generatedBarcode.generatedAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <Button onClick={handlePrintBarcode} className="w-full gap-2">
                      <Printer className="w-4 h-4" />
                      Print Barcode • प्रिंट करें
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BarcodeGenerator;
